const fs = require('fs');
const path = require('path');
const lucide = require('./node_modules/lucide-react');

const keys = Object.keys(lucide);
console.log('Chrome in lucide:', keys.includes('Chrome'));
console.log('Google in lucide:', keys.includes('Google'));
console.log('Search for "Chrome" case-insensitive:', keys.filter(k => k.toLowerCase().includes('chrome')));
console.log('Search for "Google" case-insensitive:', keys.filter(k => k.toLowerCase().includes('google')));
console.log('Search for "Browser" case-insensitive:', keys.filter(k => k.toLowerCase().includes('browser')));
console.log('Search for "Globe" case-insensitive:', keys.filter(k => k.toLowerCase().includes('globe')));
