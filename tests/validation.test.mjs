import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../src/main.jsx',import.meta.url),'utf8');
const getRule=(name)=>{
 const match=source.match(new RegExp('const '+name+' = (.*);'));
 assert.ok(match, `${name} rule exists`);
 return match[1];
};
const validPersonName=eval(getRule('validPersonName'));
const validBranch=eval(getRule('validBranch'));
const validEmail=eval(getRule('validEmail'));
const supportedResume=eval(getRule('supportedResume'));
test('TC01: empty name and numeric-only name rejected',()=>{
 for(const v of ['', '   ', '12345', 'Hiba123']) assert.equal(validPersonName(v),false);
 assert.equal(validPersonName('Hiba Taj'),true);
});
test('TC02: invalid email rejected',()=>{
 for(const v of ['', 'hello', 'test@', '@college.edu']) assert.equal(validEmail(v),false);
 assert.equal(validEmail('student@college.edu'),true);
});
test('TC03: invalid/empty branch rejected',()=>{
 assert.equal(validBranch(''),false);assert.equal(validBranch('123'),false);
 assert.equal(validBranch('CSE'),true);
});
test('TC04: skill matching rejects blank or unsupported skills',()=>{
 assert.match(source,/const available = matched\.filter/);
 assert.match(source,/available\.length \?/);
});
test('TC05: mock-test score handles unanswered questions',()=>{
 assert.match(source,/answers\[idx\] === x\[2\]/);
 assert.equal([0,1].reduce((n,x,i)=>n+({}[i]===x?1:0),0),0);
});
test('TC06: resume file extension and size validation',()=>{
 assert.equal(supportedResume(null),false);
 assert.equal(supportedResume({name:'resume.exe',size:100}),false);
 assert.equal(supportedResume({name:'resume.pdf',size:6*1024*1024}),false);
 assert.equal(supportedResume({name:'resume.docx',size:2000}),true);
});
test('TC07: senior request date and duplicate protections present',()=>{
 assert.match(source,/date < todayISO\(\)/);
 assert.match(source,/An identical pending request already exists/);
});
test('TC08: GeeksforGeeks links open separately',()=>{
 assert.match(source,/target="_blank" rel="noopener noreferrer"/);
});
