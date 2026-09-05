const fs = require( 'fs' );
const content = fs.readFileSync( 'src/app/page.js', 'utf8' );
const replacement = fs.readFileSync( 'temp.js', 'utf8' );
const newContent = content.replace( /<section className="placements-section">[\s\S]*<\/section>/, replacement );
fs.writeFileSync( 'src/app/page.js', newContent );
console.log( 'Successfully replaced!' );
