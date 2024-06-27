
import { Divider, Header } from "@/components";

export const PrivacyPolicy = () => {
  return (
    <div className="w-full flex flex-col gap-y-4 lg:px-5 px-0 py-7 text-justify text-gray-700">
      <Header className="my-0 py-0 text-center ">Privacy Policy</Header>
      <Divider variant="full" className="my-0 mb-3" />
      <div>
        <Header className="my-0  p-0">Privacy Policy</Header>
        <p className="py-3 text-lg">
          This privacy policy applies to the website www.examplewebsite.com,
          hereinafter referred to as the Website and informs visitors about
          how personal data is collected and processed by the Data Controller.
          [Company Name], with its registered office located at [Address] and
          registered in the [Business Registry] under number [Registry Number],
          acts as the Data Controller.
        </p>
        <p className="py-3 text-lg">
          The Privacy Policy reflects the Data Controllers intention to act in
          full transparency, in accordance with the Law concerning the protection
          of natural persons with regard to the processing of personal data and
          with the General Data Protection Regulation (GDPR).
        </p>
        <p className="py-3 text-lg">
          Special attention is given to the protection of users privacy, with
          the Data Controller committed to taking all necessary and reasonable
          measures to protect personal data against loss, theft, dissemination,
          or unauthorized use.
        </p>

        <p className="py-3 text-lg">
          The term personal data refers to any information relating to an
          identified or identifiable natural person, with a person being
          identifiable if they can be identified directly or indirectly.
        </p>
        <p className="py-3 text-lg">
          Users wishing to comment on any of the provisions mentioned in the
          Privacy Policy can contact the Data Controller via the postal address
          or email address provided in the contact details section of the
          Privacy Policy.
        </p>
      </div>

      <div>
        <Header className="my-0  p-0">WHAT DATA DO WE COLLECT?</Header>
        <div className="py-3 text-lg">
          The Data Controller collects and processes the following personal data,
          according to the modalities and principles described below:
          <ul className="pl-6">
            <li>
              The user&apos;`s domain, including the dynamic IP address (automatically
              picked up by the Data Controllers server).
            </li>
            <li>
              The user&apos;s email address, if provided in advance, for example, by
              posting messages on the Website, asking questions, communicating
              via email with the Data Controller, participating in discussion
              forums, identifying themselves to access a restricted part of the
              Website, etc.
            </li>
            <li>
              Information about the pages visited by the user on the Website.
            </li>
            <li>
              Any voluntarily provided information by the user, such as in
              surveys, registrations on the Website, or by identification to
              access a restricted part of the Website.
            </li>
          </ul>
        </div>
        <p className="py-3 text-lg">
          The Data Controller may also collect data without personal
          characteristics. These are considered non-personal data and can be used
          for any purpose, such as improving the Website, products and services,
          or publications of the Data Controller.
        </p>
        <p className="py-3 text-lg">
          If personal data is combined with non-personal data so that
          identification of individuals is possible, they are treated as personal
          data until individuals can no longer be identified based on the data,
          thereby breaking the link between personal and non-personal data.
        </p>
      </div>

      <div>
        <Header className="my-0  p-0">HOW ARE DATA COLLECTED?</Header>
        <div className="py-3 text-lg">
          The Data Controller collects data in various ways, namely:
          <ul className="pl-6">
            <li>Through a contact form.</li>
            <li>By subscribing to a newsletter.</li>
            <li>Through the customer area.</li>
            <li>Through the webshop.</li>
          </ul>
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">
          WHAT ARE THE PURPOSES OF THE PROCESSING?
        </Header>
        <div className="py-3 text-lg">
          Personal data is collected and processed for various purposes,
          including:
          <ul className="pl-6">
            <li>Ensuring the management and monitoring of services offered;</li>
            <li>Sending and tracking orders and invoices;</li>
            <li>
              Sending promotional information about products and services by the
              Data Controller;
            </li>
            <li>Sending promotional material;</li>
            <li>Responding to user inquiries;</li>{" "}
            <li>Compiling statistics;</li>{" "}
            <li>
              Improving the quality of the website, products, and/or services by
              the Data Controller;
            </li>
            <li>
              Sending information about new products and/or services by the Data
              Controller;
            </li>
            <li>Conducting commercial prospecting;</li>
            <li>Identifying user interests.</li>
          </ul>
          We also use and process personal data for the following purposes:
          <ul className="pl-6">
            <li>Sharing data with a business partner.</li>
            <li>
              Transferring data to a subsidiary or another company within our
              group.
            </li>
          </ul>
          If the person responsible for data processing decides to take actions
          that are not stated in this privacy policy, that person will notify the
          user of the changes and provide the user with the opportunity to refuse
          such use before their personal data is used.
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">LEGITIMATE INTERESTS</Header>
        <div className="py-3 text-lg">
          Certain processing activities by the Data Controller are based on the
          legal basis of its legitimate interests. These legitimate interests are
          proportionate to compliance with the rights and freedoms of the user. If
          the user wishes to obtain more information about the processing purposes
          based on legitimate interest, they are invited to contact the Data
          Controllercontact details in this Privacy Policy.
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">DATA RETENTION PERIOD</Header>
        <div className="py-3 text-lg">
          The Data Controller generally retains personal data only for the period
          reasonably necessary to achieve the stated purposes and in compliance
          with legal and regulatory requirements.
          <br />
          A customer&apos;s personal data is retained for a maximum of 10 years after
          termination of the contractual relationship binding the customer to the
          Data Controller.
          <br />
          At the end of the retention period, the Data Controller will take all
          reasonable steps to ensure that the personal data is made unavailable
          and inaccessible.
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">EXERCISING RIGHTS</Header>
        <div className="py-3 text-lg">
          With regard to all rights listed below, the Data Controller reserves the
          right to verify the identity of the data subject.
          <br />
          This additional information will be requested within one month after the
          request by the data subject.
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">ACCESS TO DATA AND COPIES</Header>
        <div className="py-3 text-lg">
          The user can obtain, free of charge, their written correspondence or a
          copy of their personal data processed by the Data Controller.
          <br />
          The Data Controller may require the user to pay all reasonable costs,
          based on administrative costs, for any additional copy requested by the
          user.
          <br />
          Once the user submits this request electronically, the information will
          also be delivered electronically unless the user wishes otherwise.
          Unless otherwise provided in the General Data Protection Regulation, the
          copy of their data will be communicated to the data subject no later
          than 6 months after receiving their request.
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">RIGHT TO RECTIFICATION</Header>
        <div className="py-3 text-lg">
          The user can request, free of charge, the rectification of their
          personal data if it contains errors, is incomplete, or is irrelevant,
          and request that their data be supplemented if it is found to be
          incomplete.
          <br />
          Unless otherwise provided in the General Data Protection Regulation, the
          request will be processed within one month after its submission.
        </div>
      </div>

      <div>
        <Header className="my-0  p-0">
          RIGHT TO OBJECT TO PROCESSING
        </Header>
        <div className="py-3 text-lg">
          The user may, at any time, free of charge and for reasons related to
          their particular situation,
        </div>
      </div>
    </div>
  )}

  