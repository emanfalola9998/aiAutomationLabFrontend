import React from 'react'
import Image from 'next/image'
import tisume from '../assets/images/tisume.png'
import email from '../assets/images/email (2).png'
import trigger from '../assets/images/tap.png'
import action from '../assets/images/engineering.png'
import workflow from '../assets/images/workflow.png'
import crm from '../assets/images/crm.png'
import socialMedia from '../assets/images/social-media.png'
import cloud from '../assets/images/cloud-sync.png'
import syncData from '../assets/images/data-synchronization.png'
import taskManagement from '../assets/images/task-management.png'
import emailLink from '../assets/images/email (3).png'
import { ProtectedRoute } from '@/components/ProtectedRoute'


const template = () => {
  return (
    <>
      <ProtectedRoute>
      <div className=' text-center sm:p-20'>
        <h1 className='text-2xl mt-6 text-center mb-8 font-bold '>
          Commercial work
        </h1>
        <div className='flex flex-col lg:flex-row items-stretch border-2 border-gray-400 gap-4 p-4'>
          <div className=" sm:p-8  ">
            <h2 className='text-xl font-bold mb-4'>
              Developed an Automation Workflow for Service Provider Onboarding - Tisume
            </h2>
            
            <p>
              I created an automation solution to streamline the onboarding process for service providers on a website. Initially, I used n8n templates to design the workflow, and later refined it with custom code for greater efficiency. The process involved:
            </p>

            <ol className="list-decimal pl-5 "> {/* Tailwind class to add numbers to the list */}
              <li className='my-2'>Automating Data Extraction: The system accessed the service provider's original website or hosting platform to scan and extract relevant service information.</li>
              <li className='mb-1'>Data Processing: The extracted data was saved to a text file and processed by an AI agent, which followed specific parameters to categorize and structure the information.</li>
              <li>Time Reduction: This automation reduced the onboarding time from 6 hours to just 10 minutes, freeing up valuable time for the business to focus on other critical areas.</li>
            </ol>
          </div>
            <div className="border-2 lg:border border-gray-400  mx-4"></div>

            <div className='flex items-center justify-center'>
            
            <a href="https://www.Tisume.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={tisume}
                alt="image of Tisume logo"
                className='sm:w-64 md:w-80 lg:w-96'
              />
            </a>
          </div>
            
      </div>


        <div className='mt-10 text-center justify-center  '>
          <h1 className='mb-10 font-bold text-xl'>
            Our Manifesto 
          </h1>
          <p className='mb-10'>
            “Empowering your business with intelligent AI automations — smarter workflows, better results.”
          </p>
          <h1 className='my-5 p-5 md:p-0 font-bold text-xl'>Automations</h1>

          <div className='grid grid-col-1 grid-row-1  lg:grid-cols-3 lg:grid-rows-2 gap-4 my-10'>
            
            <div className='flex flex-col justify-center border-2 shadow-2xl '>
              <div className='flex flex-row justify-center  items-center text-2xl gap-3'><span><Image src={email} className="w-20" alt="email icon"/></span>Notifications</div> 
              <div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={trigger} alt="icon of a tapping/trigger action" className='w-20'/> </span> New submission on a Google Form or Typeform.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={action} alt="icon of gears" className='w-20' /> </span> Send an email through Gmail or Mailgun, or notify in Slack.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={workflow} alt="workflow" className='w-20'/> </span>Example use case: Notify a team member or group every time someone submits a form.</div>
              </div>
            </div>

            <div className='flex flex-col justify-center border-2 shadow-2xl '>
              <div className='flex flex-row justify-center  items-center text-2xl gap-3'><span><Image src={crm} className="w-20" alt="crm-icon"/></span>New Leads from Web Forms to CRM</div> 
              <div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={trigger} alt="icon of a tapping/trigger action" className='w-20'/> </span> New form submission from a web page (e.g., Google Forms, Typeform, or Jotform).</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={action} alt="icon of gears" className='w-20' /> </span> Add lead to a CRM such as HubSpot, Salesforce, or Pipedrive.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={workflow} alt="workflow" className='w-20'/> </span>Example use case: Automatically add new leads from your website to your CRM system for follow-up.</div>
              </div>
            </div>

            <div className='flex flex-col justify-center border-2 shadow-2xl '>
              <div className='flex flex-row justify-center  items-center text-2xl gap-3'><span><Image src={socialMedia} className="w-20" alt="social-media-icon"/></span>Social Media Post Automation</div> 
              <div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={trigger} alt="icon of a tapping/trigger action" className='w-20'/> </span> New blog post or new content uploaded to a website.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={action} alt="icon of gears" className='w-20' /> </span> Post the content on social media platforms like Twitter, Facebook, LinkedIn, or Instagram.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={workflow} alt="workflow" className='w-20'/> </span> Example use case: Automatically share your latest blog posts or product updates on social media.</div>
              </div>
            </div>

            <div className='flex flex-col justify-center border-2 shadow-2xl '>
              <div className='flex flex-row justify-center  items-center text-2xl gap-3'><span><Image src={cloud} className="w-20" alt="cloud-icon"/></span>Automated Backups</div> 
              <div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={trigger} alt="icon of a tapping/trigger action" className='w-20'/> </span> Scheduled trigger (e.g., every day at midnight).</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={action} alt="icon of gears" className='w-20' /> </span> Upload a backup file to cloud storage (Google Drive, Dropbox, etc.).</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={workflow} alt="workflow" className='w-20'/> </span> Example use case: Schedule and automate daily backups of important files to ensure data safety.</div>
              </div>
            </div>

            
            <div className='flex flex-col justify-center border-2 shadow-2xl '>
              <div className='flex flex-row justify-center  items-center text-2xl gap-3'><span><Image src={syncData} className="w-20" alt="sync-data-Icon"/></span>Syncing Data Between Apps</div> 
              <div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={trigger} alt="icon of a tapping/trigger action" className='w-20'/> </span>New row in Google Sheets, Airtable, or a new record in a database.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={action} alt="icon of gears" className='w-20' /> </span> Update or create a new entry in another platform (e.g., syncing Google Sheets with Airtable).</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={workflow} alt="workflow" className='w-20'/> </span> Example use case: Sync your data across multiple tools automatically without manual entry.</div>
              </div>
            </div>

            <div className='flex flex-col justify-center border-2 shadow-2xl '>
              <div className='flex flex-row justify-center  items-center text-2xl gap-3'><span><Image src={taskManagement} className="w-20" alt="task-management-icon"/></span>Task Management Automation</div> 
              <div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={trigger} alt="icon of a tapping/trigger action" className='w-20'/> </span>New task created in a project management tool like Trello or Asana.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={action} alt="icon of gears" className='w-20' /> </span> Send a notification in Slack, create a calendar event, or notify the responsible person via email or SMS.</div>
                <div className='flex flex-row justify-center  items-center text-l gap-3'><span><Image src={workflow} alt="workflow" className='w-20'/> </span> Example use case: Automatically alert team members when a new task is assigned to them.</div>
              </div>
            </div>

          </div>

        </div>
        <div className='flex flex-row justify-center gap-4'>
          <p>If you would like to get in contact for possible automation needs please click the Message Icon 
          </p>
            <a className='' href="mailto:emmanuelfalola9998@gmail.com.com">
            <Image 
                src={emailLink}
                alt="email-link"
                className='w-6'
            />
          </a>
        </div>
      </div>
      </ProtectedRoute>
    </>
  )
}

export default template
