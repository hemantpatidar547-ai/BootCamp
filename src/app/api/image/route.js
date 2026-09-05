import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET ()
{
    const filePath = path.join( process.cwd(), '.next', 'assests', 'office8.webp' );
    try {
        const imageBuffer = fs.readFileSync( filePath );
        return new NextResponse( imageBuffer, {
            headers: {
                'Content-Type': 'image/webp',
            },
        } );
    } catch ( e ) {
        return new NextResponse( "Image not found: " + e.message, { status: 404 } );
    }
}
