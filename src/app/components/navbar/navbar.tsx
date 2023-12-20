import React from 'react';
import Link from "next/link";
import "./navbar.css"

function Navbar() {
    return (
        <section id="Navabar">
            <section id="logo">
                <h1>WorkTree</h1>
            </section>

            <section className="links">
                <nav>
                    <ul>

                        <li><Link href="/employees" className="link">Listview</Link></li>

                    </ul>

                </nav>
            </section>


        </section>
    );
}

export default Navbar;