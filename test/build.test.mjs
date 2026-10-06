import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {buildFeaturePackage} from '../build.mjs';
test('build produces the exact reviewed voice artifact',async()=>{
 const pkg=JSON.parse(await readFile(new URL('../feature.json',import.meta.url),'utf8'));
 const result=await buildFeaturePackage(pkg,await mkdtemp(join(tmpdir(),'vitalk-voice-package-')));
 assert.deepEqual(JSON.parse(await readFile(result.path,'utf8')),pkg);
});
test('rejects changed permissions and spoofed feature IDs',async()=>{
 const pkg=JSON.parse(await readFile(new URL('../feature.json',import.meta.url),'utf8'));
 for(const changed of [{...pkg,feature:'english'},{...pkg,manifest:{...pkg.manifest,permissions:['history.read']}}])
 await assert.rejects(buildFeaturePackage(changed,tmpdir()),/不匹配/);
});
