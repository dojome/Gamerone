import React from 'react';
import Page from 'components/layout/Page';
import { SUPPORT_EMAIL } from 'utils/constants';
import '../style.scss';
import { Link } from 'react-router-dom';

const Privacy: React.FC = (): JSX.Element => {
  const EMAIL_ADDRESS = <a href={`mailto:` + SUPPORT_EMAIL}>{SUPPORT_EMAIL}</a>;
  const TERMS_OF_SERVICE = <Link to={'/terms'}>Terms of Service</Link>;
  return (
    <Page title="Privacy Policy">
      <section
        className="wrapper legal"
        style={{ marginTop: '10rem', marginBottom: '10rem' }}
      >
        <div className="title">
          <h1>Gamer One Entertainment Inc.</h1>
          <h1>Privacy Policy</h1>
        </div>

        <p>Updated August 1, 2020</p>

        <p>
          This Privacy Policy (“<b>Privacy Policy</b>”) is applicable to users
          who access or use the Service. This Privacy Policy does not cover any
          interaction you may have with Gamer One Entertainment Inc.(“
          <b>Gamer One</b>”, “<b>our</b>”, “<b>we</b>” or “<b>us</b>”) by
          telephone, postal mail or other offline communications. Capitalized
          terms used but not defined in this Privacy Policy have the meanings
          assigned to them in our {TERMS_OF_SERVICE}.
        </p>

        <h2>Notice</h2>

        <p>
          Gamer One respects your privacy and is committed to protecting
          personal information that you provide in connection with your use of
          the Service. This Privacy Policy is intended to provide you notice of
          our information practices, including the types of information
          gathered, how that information is used and safeguarded, and how you
          can control the maintenance and sharing of your information.
        </p>

        <p>
          BY REGISTERING AN ACCOUNT WITH GAMER ONE OR BY ACCESSING OR USING THE
          SERVICE, YOU CONSENT TO THE TERMS AND CONDITIONS OF THIS PRIVACY
          POLICY AND TO OUR COLLECTION AND PROCESSING OF YOUR PERSONAL
          INFORMATION FOR THE PURPOSES STATED BELOW. IF YOU DO NOT AGREE TO THE
          TERMS AND CONDITIONS OF THIS PRIVACY POLICY, YOU CANNOT ACCESS OR USE
          THE SERVICE.
        </p>

        <h2>
          Collection of Personally Identifiable Information and Other Data
        </h2>

        <p>
          In order to use certain features or functions of the Service, you must
          create an Account with us. When you create your Account, you will be
          asked to provide a legitimate email address that you control and to
          create a unique user name and a password. We may also allow you to
          register for your Account using your login credentials from certain
          Third Party Platforms, such as Facebook or Twitter.
        </p>

        <p>
          Once you have created your Account, we will create a profile for you
          containing the email address, user name and password that you provided
          to us. In order to use the Service, you will need provide your first
          and last name for your profile. If you want, you can add your
          country/location, a short bio about you, your birthdate and your
          personal website to your profile, but this information is not required
          in order for you to use the Service. The contents of your profile, as
          you may modify them from time to time, is called your “
          <b>Profile Information</b>”.
        </p>

        <p>
          You have the ability to control how much of your Profile Information
          is available for viewing by the public, other users of the Service and
          our sponsors and advertisers:
        </p>
        <ul>
          <li>
            Your Profile Information can disclose to a user if you follow that
            user
          </li>
          <li>
            Your Profile Information can disclose if you and another user are
            mutual followers
          </li>
          <li>
            Your Profile Information can disclose if you are a member of a
            particular squad
          </li>
          <li>
            Your Profile Information can disclose no information about you
          </li>
        </ul>

        <p>
          You can change the level of public access to your Profile Information
          at your convenience. The more Profile Information that you make
          publicly available, the more information that will be available to our
          advertisers and sponsors. You understand that our advertisers and
          sponsors may initiate contact with you regarding potential business
          relationships or to send you information about special promotions or
          offers. The terms of any relationships you may develop with our
          advertisers and sponsors are separate transactions and are not subject
          to or governed by our {TERMS_OF_SERVICE} or this Privacy Policy.
        </p>

        <p>
          We may request to send you push notifications regarding your Account
          or our Software. If you wish to opt-out from receiving these types of
          communications, you may turn them off in your Device’s settings.
        </p>

        <p>
          We may also use technology, such as web beacons (also known as
          Internet tags, pixel tags and transparent GIFs), cookies, frames,
          server log analysis and other technologies as they are developed, to
          enhance your experience with the Service. We automatically collect
          certain aggregate information and analytical data related to your use
          of the Service. Aggregate information is non-personally identifiable
          or anonymous information about you, including the date and time of
          your visit, the phone network associated with your mobile Device, your
          mobile Device’s operating system or platform, the type of mobile
          Device you use, your mobile Device’s unique device ID and the features
          of the Service that you accessed. We may also use these technologies
          to serve you with advertising content that we think will interest you.
          To do so, we or our business partners may observe your behaviors over
          time on the Service and across Third Party Platforms. We may also
          collect information about your browsing history and/or your historical
          use of the Service.
        </p>

        <p>
          We may request or collect information from you on a voluntary basis
          when you:
        </p>
        <ul>
          <li>Create your Account</li>
          <li>Add or change your Profile Information</li>
          <li>
            Use the Service, including to identify you as a new or returning
            user
          </li>
          <li>Create, publish or change Content</li>
          <li>Send questions or comments to our support team</li>
          <li>Fill out online surveys</li>
        </ul>

        <p>
          With your consent and in connection with your use of the Service, we
          may use GPS technology (or other similar technology) to determine your
          location information in order to determine those aspects of the
          Service you are permitted to use. You have the right to opt out of
          having this information collected, but if you do you will not receive
          the full features or functionality of the Service.
        </p>

        <h2>Use of Information Collected</h2>

        <p>
          Except as specifically outlined in this Privacy Policy, we do not
          share your Profile Information with non- affiliated third parties
          without your permission. We may disclose Profile Information,
          aggregated information, such as demographic information, and certain
          statistical analysis to third party service providers to ensure
          compliance with applicable laws and monitor for fraudulent activity,
          and to third party developers who are reviewing or auditing the
          Service. However, before sharing your information with any such third
          party, we require the third party to enter into an agreement that
          requires that third party to keep your information confidential, and
          prohibits that third party from using your information for any purpose
          that is not related to the Service.
        </p>

        <p>
          We will share information with third parties who perform the Service
          on our behalf. For example, we share information with vendors who help
          us manage our online registration process. We will share information
          with our business partners and licensors of Third Party Platforms.
          This may include a third party who provides or sponsors an event, or
          who operates a venue where an event is being held. Our partners use
          the information we give them as described in their privacy policies.
          You should read those policies to learn how they treat your
          information.
        </p>

        <p>
          We disclose information, including Profile Information, that we, in
          good faith, believe is appropriate to cooperate in investigations of
          fraud or other illegal activity, or to conduct investigations of
          violations of our {TERMS_OF_SERVICE}.
        </p>

        <p>
          We will disclose information, including Profile Information, in
          response to a subpoena, warrant, court order, attachment, order of a
          court-appointed receiver or other comparable legal process, including
          subpoenas from private parties in a civil action. If the subpoena
          seeks information about an identified user or limited group of users,
          we will make reasonable business efforts to contact the user(s) before
          providing information to the party that requests it. We cannot
          guarantee that we will be able to contact the user(s) in all cases,
          whether because of a time limit, court order, inability to effectively
          contact a user or for any other reason.
        </p>

        <p>
          Except as set out in this Privacy Policy, we do not sell, rent or
          otherwise disclose Profile Information collected from and about our
          users to non-affiliated third parties. However, in the event of a
          merger, acquisition, reorganization, bankruptcy or other similar
          event, our customer information may be transferred to a successor
          entity or to an assignee, if permitted by and done in accordance with
          applicable law.
        </p>

        <h2>Use of Cache Data</h2>

        <p>
          A cache is a component of your Device that transparently stores data
          for record-keeping purposes. Cache data does not identify users, but
          does identify your Device. Most browsers and applications are
          initially set up to accept such data. If you prefer, you can program
          your Device so that it does not store this information while utilizing
          the Service. Certain features of the Service may only be available
          through the collection of such data. We may use that data to assist in
          data collection and to track software usage and trends to help us
          better serve you. We also permit third parties who have entered into
          confidentiality agreements to access that data to help us monitor use
          of the Service for fraud or any other activity that does not comply
          with applicable laws. This Privacy Policy covers the use of cookies
          and cache data on the Service by us only and does not cover the use of
          cookies or tracking technologies by any of our business partners.
        </p>

        <h2>Account Security</h2>

        <p>
          The security of your Account relies on your protection of your
          password and Device. You are responsible for maintaining the security
          of your password and Device. You are solely responsible and liable for
          any and all activities that occur under your Account. You must not
          share your password with anyone. We will never ask you to send your
          password or other sensitive information to us in an email, though we
          may ask you to enter this type of information as part of your use of
          the Service.
        </p>

        <p>
          Any email or other communication requesting your password or asking
          you to provide sensitive Profile Information via email should be
          treated as unauthorized and suspicious and should be reported to us
          immediately at {EMAIL_ADDRESS}. If you share your password or your
          Device with a third party for any reason, then that person will have
          access to your Account and your personal information. If you believe
          someone else has obtained access to your password, please change it
          immediately. If you believe that unauthorized access to your Account
          has already occurred, please report it to us immediately at{' '}
          {EMAIL_ADDRESS}.
        </p>

        <p>
          We may have access to your password and may use it to access your
          Account for debugging, quality assurance or other internal purposes.
        </p>

        <p>
          We have implemented appropriate technical and organizational security
          measures designed to protect the security of any personal information
          we process. However, please understand that we cannot, and do not,
          guarantee that the internet itself is 100% secure. Although we will
          take reasonable precautions to protect your personal information,
          transmission of personal information to and from our servers is at
          your own risk. You should only access the Service within a secure
          environment.
        </p>

        <h2>Postings to Public Forums</h2>

        <p>
          All postings in our public forums will generally be available to, and
          freely accessible by, other users of these forums as well as the
          Internet general public. Therefore, you should not expect that any
          Content you post will be kept private or confidential and should
          exercise discretion when using these public forums. Additionally, your
          username, which you can change, will always be included in conjunction
          with your postings in the public forums. We are not responsible for
          events arising from the distribution of any Content that you choose to
          post publicly or share through these forums. All Content uploaded by
          you while utilizing the Service is subject to our {TERMS_OF_SERVICE}.
        </p>

        <h2>Maintaining and Updating Your Profile Information</h2>

        <p>
          You may edit and delete portions of your Profile Information. You can
          also delete your Account entirely. After receiving any requested
          changes to your Profile Information, we will make reasonable efforts
          to ensure that all of your personal information stored in databases we
          actively use to operate the Service will be updated, corrected,
          changed or deleted, as applicable, as soon as reasonably practicable.
          However, we reserve the right to retain in our archival files any
          information we remove from or change in our active databases. We will
          retain certain Profile Information in order to comply with applicable
          laws. We may also retain such information to resolve disputes,
          troubleshoot problems or enforce our {TERMS_OF_SERVICE}. In addition,
          it may not be technologically possible to remove every record of the
          information you have previously provided us, as a copy may exist in a
          non-erasable form that will be difficult or impossible for us to
          locate.
        </p>

        <h2>Storage of Your Personal Information</h2>

        <p>
          Our servers are located in Canada. If you are accessing the Service
          from outside Canada, please be aware that your information may be
          transferred to, stored, and processed by us in the facilities of our
          third party hosting provider and by those third parties with whom we
          may share your personal information in countries other than Canada.
        </p>

        <p>
          Note to Residents of the EEA: If you are a resident in the European
          Economic Area, then these countries may not have data protection or
          other laws as comprehensive as those in your country. We will however
          take all measures reasonably necessary to protect your personal
          information in accordance with this Privacy Policy and applicable law.
          We have implemented the European Commission&#39;s Standard Contractual
          Clauses to govern transfers of personal information between us and our
          third-party providers, which require all such recipients to protect
          personal information that they process from the EEA in accordance with
          European data protection laws. Our Standard Contractual Clauses can be
          provided upon request. We have implemented similar appropriate
          safeguards with our third party service providers and partners and
          further details can be provided upon request.
        </p>

        <h2>Retention of Information</h2>

        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this Privacy Policy, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting or other legal requirements). No purpose in this Policy
          will require us keeping your personal information for longer than 180
          days past the termination of your Account.
        </p>

        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize it, or, if
          this is not possible (for example, because your personal information
          has been stored in backup archives), then we will securely store your
          personal information and isolate it from any further processing until
          deletion is possible.
        </p>

        <h2>Your Privacy Rights</h2>

        <p>
          In some regions (like Canada and the European Economic Area), you have
          certain rights under applicable data protection laws. These may
          include the right (a) to request access and obtain a copy of your
          personal information, (b) to request rectification or erasure; (c) to
          restrict the processing of your personal information; and (d) if
          applicable, to data portability. In certain circumstances, you may
          also have the right to object to the processing of your personal
          information. To make such a request, please contact us at{' '}
          {EMAIL_ADDRESS}. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </p>

        <p>
          If we are relying on your consent to process your personal
          information, you have the right to withdraw your consent at any time.
          Please note however that this will not affect the lawfulness of the
          processing before its withdrawal.
        </p>

        <p>
          If you are resident in the European Economic Area and you believe we
          are unlawfully processing your personal information, you also have the
          right to complain to your local data protection supervisory authority.
          You can find their contact details here:{' '}
          <a
            href="http://ec.europa.eu/justice/data-
protection/bodies/authorities/index_en.htm"
            target={'_blank'}
            rel={'nofollow noopener noreferrer'}
          >
            http://ec.europa.eu/justice/data-
            protection/bodies/authorities/index_en.htm
          </a>
        </p>

        <h2>California Residents</h2>

        <p>
          If you are a resident of California, you are granted specific rights
          regarding access to your personal information. California Civil Code
          Section 1798.83, also known as the “Shine The Light” law, permits our
          users who are California residents to request and obtain from us, once
          a year and free of charge, information about categories of personal
          information (if any) we disclosed to third parties for direct
          marketing purposes and the names and addresses of all third parties
          with which we shared personal information in the immediately preceding
          calendar year. If you are a California resident and would like to make
          such a request, please contact us at {EMAIL_ADDRESS}.
        </p>
        <p>
          If you are under 18 years of age, reside in California and have a
          registered Account with us, then you have the right to request removal
          of unwanted data that you publicly post on our sites. To request
          removal of such data, please contact us at {EMAIL_ADDRESS}, and
          include the email address associated with your account and a statement
          that you reside in California. We will make sure the data is not
          publicly displayed on our sites, but please be aware that the data may
          not be completely or comprehensively removed from our systems.
        </p>

        <h2>Governing Law; Notification of Changes</h2>
        <p>
          Any litigation or other dispute resolution between you and Gamer One
          arising out of or relating to this Privacy Policy, our{' '}
          {TERMS_OF_SERVICE} or your use of the Service will take place in
          Vancouver, British Columbia, and you hereby consent to the personal
          jurisdiction and exclusive venue of the Courts of the Province of
          British Columbia with respect to any such litigation or dispute
          resolution. This Privacy Policy, our {TERMS_OF_SERVICE} will be
          governed by and construed in accordance with the laws of the Province
          of British Columbia and the laws of Canada applicable therein,
          excluding that body of British Columbia law concerning conflicts of
          laws. The parties expressly exclude the application of the United
          Nations Convention on Contracts for the International Sale of Goods,
          and all implementing legislation thereunder.
        </p>

        <p>
          Gamer One is a Canadian company, and so we have written this Privacy
          Policy to satisfy Canadian privacy laws, except that we have made
          specific accommodation for residents of the European Economic Area and
          residents of California, USA as noted above in this Policy. By
          accessing and using the Service, you expressly agree to that level of
          privacy protection.
        </p>

        <p>
          ALL CLAIMS AGAINST GAMER ONE MUST BE BROUGHT IN YOUR OWN CAPACITY, AND
          NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
          REPRESENTATIVE PROCEEDING. YOU AGREE THAT, BY REGISTERING AN ACCOUNT
          AND/OR USING THE SERVICE, YOU ARE WAIVING THE RIGHT TO A TRIAL BY JURY
          OR TO PARTICIPATE IN A CLASS ACTION.
        </p>

        <h2>Effective Date; Policy Changes</h2>

        <p>
          Each time you access or use the Service, the current version of our
          Privacy Policy will apply. Accordingly, when you use the Service, you
          should check the currency date of this Privacy Policy (that date is at
          the top) and review any changes since the last version. Our business
          changes frequently and this Privacy Policy is subject to change from
          time to time. Unless stated otherwise, our current Privacy Policy
          applies to all information that we have about you. We will not
          materially change our policies and practices to make them less
          protective of customer information collected in the past without the
          consent of affected customers.
        </p>

        <h2>Contact Us</h2>
        <p>
          To contact us with your questions or comments regarding this Privacy
          Policy or the information collection and dissemination practices of
          the Service, please email us at {EMAIL_ADDRESS}.
        </p>

        <p>
          <Link to={'/terms'}>Click here</Link> to see our Terms of Service.
        </p>

        <p>
          If you are a resident in the European Economic Area, the “data
          controller” of your personal information is Gamer One Entertainment
          Inc. and we can be contacted by sending us an email at {EMAIL_ADDRESS}
          .
        </p>
      </section>
    </Page>
  );
};

export default Privacy;
