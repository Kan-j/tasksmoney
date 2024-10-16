import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black py-10 text-white p-5" id='footer'>
    <div className="grid grid-cols-1 gap-y-16 gap-x-10 sm:grid-cols-2 lg:grid-cols-6 bg-black py-10 text-white">
      {/* Footer first section */}
      <div className="-mt-2.5 lg:col-span-3">
        <h1
          className="text-3xl lg:text-4xl font-bold mr-3 mb-5 max-w-[30rem]"
          style={{ lineHeight: "151%" }}
        >
          Securing today for a safer tomorrow
        </h1>
        <div className="flex gap-4 items-center">
          <Link href="https://wa.me/qr/LIGL67KQQT6EC1" target="_blank">
            <img
              className="size-9"
              src="/assets/icons/whatsapp-icon.png"
              alt="whatsapp"
            />
          </Link>
          <Link href="https://t.me/Interpolcyberdivision" target="_blank">
            <img
              className="size-9"
              src="/assets/icons/telegram-icon.png"
              alt="telegram"
            />
          </Link>
          <Link href="mailto:Interpolcyber83@gmail.com">
            <img
              className="size-9"
              src="/assets/icons/gmail-icon.png"
              alt="gmail"
            />
          </Link>
        </div>
      </div>

      {/* Footer second section */}
      <div className="flex flex-col gap-3">
        <h4 className="mb-2 font-bold">About</h4>
        <Link href="/about" className="text-md text-gray-300">
          About Us
        </Link>
        <Link href="/contact" className="text-md text-gray-300">
          Contact Us
        </Link>
        <Link href="/report-case" className="text-md text-gray-300">
          Report Case
        </Link>
        <Link
          href="https://www.interpol.int/en/News-and-Events"
          className="text-md text-gray-300"
        >
          Blog
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="mb-2 font-bold">Social Links</h4>
        <Link
          href="https://wa.me/qr/LIGL67KQQT6EC1"
          className="text-md text-gray-300"
          target="_blank"
        >
          WhatsApp
        </Link>
        <Link href="/about" className="text-md text-gray-300">
          Facebook
        </Link>
        <Link
          href="https://t.me/Interpolcyberdivision"
          className="text-md text-gray-300"
          target="_blank"
        >
          Telegram
        </Link>
        <Link href="/about" className="text-md text-gray-300">
          Twitter X
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="mb-2 font-bold">Get In Touch</h4>
        <Link href="tel:+33472447000" className="text-md text-gray-300">
          +33 4 72 44 70 00
        </Link>
        <p className="text-md text-gray-300">
          123 Tech Street, Suite 101Cityville, State, ZIP
        </p>
        <Link
          href="mailto:Interpolcyber83@gmail.com"
          className="text-md text-gray-300"
        >
          contact@....int
        </Link>
      </div>
    </div>
</footer>
  )
}

export default Footer