import React from 'react';

function Footer() {
    return (
        <footer className={'mt-12 bg-accent p-5'}>
            <div className="container mx-auto flex max-w-screen-xl items-center justify-between">
                <div className="text-white">&copy; {new Date().getFullYear()} CUMEVENT</div>
                <div>
                    <h4 className="mb-2 text-white">Contact Us</h4>
                    <ul className="text-white">
                        <li>Email: info@cumevent.com</li>
                        <li>Phone: +1234567890</li>
                        {/* Add more contact options if needed */}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
