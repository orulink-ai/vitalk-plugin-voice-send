import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const definition=JSON.parse(await readFile(new URL('./feature.json',import.meta.url),'utf8'));
function canonical(value){
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value&&typeof value==='object')return '{'+Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+':'+canonical(v)).join(',')+'}';
 return JSON.stringify(value);
}
export async function buildFeaturePackage(pkg,directory){
 if(canonical(pkg)!==canonical(definition))throw new Error('功能包与受审定义不匹配');
 const bytes=JSON.stringify(pkg,null,2)+'\n';
 await mkdir(directory,{recursive:true});
 const path=join(directory,`${pkg.manifest.id}.vitalk-feature.json`);
 const sha256=createHash('sha256').update(bytes).digest('hex');
 await writeFile(path,bytes);await writeFile(path+'.sha256',sha256+'\n');
 return {path,sha256,url:`/plugins/${pkg.manifest.id}.vitalk-feature.json`};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
 console.log(await buildFeaturePackage(definition,fileURLToPath(new URL('./dist/',import.meta.url))));
