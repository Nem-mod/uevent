import React from 'react';

function Footer() {
    return (
        <footer className={'mt-12 p-5 bg-accent'}>
            <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="text-white">
                    &copy; {new Date().getFullYear()} CUMEVENT
                </div>
                <div>
                    <h4 className="text-white mb-2">Contact Us</h4>
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