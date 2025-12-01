import emailLink from '../assets/images/email (3).png'
import Image from 'next/image'

const Footer = () => {

    return (
        <>
            <div className="h-px bg-black w-full"></div>
            <div className='flex justify-center gap-10 text-black items-center'>
                Copyright @2025 AIAutomationLab. AiAutomationLab is not responsible for the content of external sites.
                <a className='' href="mailto:emmanuelfalola9998@gmail.com.com">
                    <Image 
                        src={emailLink}
                        alt="email-link"
                        className='w-10'
                    />
                </a>

            </div>
        </>
        
    )
}

export default Footer
