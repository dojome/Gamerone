import React from 'react';
import Page from 'components/layout/Page';
import { SUPPORT_EMAIL } from 'utils/constants';
import { Link } from 'react-router-dom';
import '../style.scss';

const Terms: React.FC = (): JSX.Element => {
  const PRIVACY_POLICY = <Link to={'/privacy'}>Privacy Policy</Link>;
  return (
    <Page title="Terms of Service">
      <section
        className="wrapper legal"
        style={{ marginTop: '10rem', marginBottom: '10rem' }}
      >
        <div className="title">
          <h1>Gamer One Entertainment Inc.</h1>
          <h1>Terms of Service</h1>
        </div>
        <p>Updated August 1, 2020</p>
        <p>
          PLEASE READ THESE TERMS OF SERVICE CAREFULLY BECAUSE THEY DESCRIBE
          YOUR RIGHTS AND RESPONSIBILITIES
        </p>
        <p>
          The following Terms of Service (“<b>Terms</b>”) are between you and
          Gamer One Entertainment Inc. (“<b>Gamer One</b>”, “<b>we</b>”, “
          <b>our</b>” or “<b>us</b>”) and constitute a legal agreement that
          governs your use of Gamer One’s G1.gg esports and gaming platform and
          website (collectively referred to as the “<b>Service</b>”).
        </p>
        <h2>
          <span className="sec">1.</span> Your Agreement to These Terms
        </h2>
        <p>
          BY REGISTERING AN ACCOUNT WITH GAMER ONE OR DOWNLOADING ANY SOFTWARE
          (defined below) FROM GAMER ONE OR ITS AUTHORIZED DISTRIBUTOR (such as
          Apple’s iTunes Store), YOU: (a) ACKNOWLEDGE THAT YOU HAVE READ THESE
          TERMS IN THEIR ENTIRETY; (b) AGREE TO BE BOUND BY THESE TERMS; AND (c)
          ARE AUTHORIZED AND ABLE TO ACCEPT THESE TERMS. IF YOU DON’T WISH TO BE
          BOUND BY THESE TERMS, THEN DO NOT REGISTER AN ACCOUNT OR DOWNLOAD ANY
          SOFTWARE. IF YOU DO NOT ACCEPT THESE TERMS, THEN YOU CANNOT USE YOUR
          ACCOUNT OR OTHERWISE USE THE SERVICE. You should print or otherwise
          save a copy of these Terms for your records.
        </p>
        <h2>
          <span className="sec">2.</span> Legal Authority
        </h2>
        <p>
          To register for and/or use the Service you must be: (a) of legal age
          to form a binding contract with Gamer One, and (b) cannot be a person
          barred from receiving the Service under the laws of Canada or in the
          country in which you reside or from where you use the Service. By
          accepting these Terms you represent that you understand and agree to
          these requirements.
        </p>
        <h2>
          <span className="sec">3.</span> Changes to this Agreement
        </h2>
        <p>
          We may update or change these Terms from time to time and recommend
          that you review these Terms on a regular basis. You understand and
          agree that your continued use of the Service after these Terms have
          changed constitutes your acceptance of these Terms as revised.
        </p>
        <h2>
          <span className="sec">4.</span> Description of the Service
        </h2>
        <p>
          The Service is an esports and community platform that includes (a) the
          ability for users to create a personal profile to promote and market
          their gaming skills, statistics and achievements, and those of their
          team; (b) a platform for sponsors and users to review user profiles;
          and (c) a network that allows users to communicate with other users,
          sponsors and gaming industry influencers. These Terms govern only the
          content, features and activities related to this Service.
        </p>
        <p>
          You understand and acknowledge that the Service is made available on
          an “AS IS” and “AS AVAILABLE” basis. The Service may contain errors or
          inaccuracies that could cause failures, corruption or loss of data
          and/or information from your device and from peripherals (including,
          without limitation, servers and computers) connected thereto (“
          <b>Device</b>”). We strongly encourage you to back-up all data and
          information on your Device prior to using the Service.{' '}
          <b>
            YOU ASSUME ALL RISKS AND ALL COSTS ASSOCIATED WITH YOUR USE OF THE
            SERVICE, INCLUDING, WITHOUT LIMITATION, ANY INTERNET ACCESS FEES,
            BACK-UP EXPENSES, COSTS INCURRED FOR THE USE OF YOUR DEVICE, AND ANY
            DAMAGE TO ANY EQUIPMENT, SOFTWARE, INFORMATION OR DATA
          </b>
          . We are not obligated to provide any maintenance, technical or other
          support for the Service.
        </p>
        <h3>Integration of Third Party Software</h3>
        <p>
          As part of the Service, we may integrate or otherwise provide access
          to third party social communication platforms, such as Facebook or
          Twitter, (“Third Party Platforms”). You understand and agree that we
          are not obligated to offer or continue to provide access or
          integration to any Third Party Platforms and that our ability to offer
          or continue to provide such access and integration is subject to the
          license and other terms of use relating to those Third Party
          Platforms. Your right to access and use features of Third Party
          Platforms is governed by the terms and conditions and privacy policies
          of those Third Party Platform licensors.
        </p>
        <h3>Changing the Service</h3>
        <p>
          We reserve the right to modify, suspend or stop the Service (or any
          part thereof), either temporarily or permanently, at any time, with or
          without prior notice to you. Without limiting the foregoing, we may
          provide notice of any such changes to the Service by posting them on
          our website and/or via the Service. You agree that we are not liable
          to you or any third party for any modification or cessation of the
          Service. You acknowledge that we have no express or implied obligation
          to provide, or continue to provide, the Service, or any part thereof,
          now or in the future; and in addition, we may at any time, upon prior
          notice as required by applicable law, institute charges or fees for
          the Service.
        </p>
        <h3>Feedback</h3>
        <p>
          As part of using the Service, we will provide you with the opportunity
          to submit comments, suggestions or other feedback regarding your use
          of the Service. You agree that in the absence of a separate written
          agreement to the contrary, we own all rights to any feedback provided
          by you and we are free to use that feedback for any purpose.
        </p>
        <h3>Limitations on Use</h3>
        <p>
          We may impose certain limitations on the use of the Service, such as
          restricting the number of Accounts you can register, imposing
          expiration dates on some or all of your Content (as defined in Section
          8 below) and removing expired Content from the Service. You agree to
          use the Service only as permitted by these Terms and all applicable
          laws. We reserve the right to modify or impose any limitations on the
          use of the Service at any time, with or without notice to you.{' '}
        </p>

        <h3>No Resale of Service</h3>
        <p>
          You agree that you will not reproduce, copy, duplicate, sell, resell,
          rent or trade the Service (or any part thereof) for any purpose.
        </p>

        <h2>
          <span className="sec">5.</span> Your Account
        </h2>

        <p>
          In order to use certain features or functions of the Service, you must
          create an account (“<b>Account</b>”) with us. When you create your
          Account, you will be asked to provide a legitimate email address that
          you control and to create a unique user name and password. After you
          submit this information to us, we will send an email to you at the
          address you provided so that we can verify that the email address is
          legitimate. You will be asked to confirm your Account registration by
          clicking on the link included in our email to you. Once you have
          confirmed your Account with us, you will be eligible to use the
          Service.
        </p>
        <p>
          PASSWORDS ARE ISSUED ON A PERSONAL BASIS. ACCORDINGLY, ALL CONTENT OR
          INSTRUCTIONS TRANSMITTED BY OR RECEIVED FROM ANYONE PRESENTING YOUR
          PASSWORD ON THE SERVICE WILL BE DEEMED BINDING ON YOU. You are solely
          responsible and liable for all activity that takes place on your
          Account and for all actions taken via your password, whether or not
          made with your knowledge or authority. You agree to guard your
          password carefully, with the full awareness that a failure to keep it
          secure will enable others to engage in transactions through the
          Service for which you will be legally responsible.
        </p>
        <p>
          We may also allow you to register for your Account using your login
          credentials from certain third party platforms (“
          <b>Third Party Platforms</b>”), such as Facebook or Twitter. Our
          access to your credentials of those Third Party Platforms is governed
          by the terms of our {PRIVACY_POLICY}.
        </p>

        <h2>
          <span className="sec">6.</span> Your Profile
        </h2>

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
          is available for viewing by the public and other users of the Service,
          sponsors and advertisers. For more information on these profile
          settings, please review our {PRIVACY_POLICY}.
        </p>

        <h2>
          <span className="sec">7.</span> Gamer One Privacy Policy
        </h2>

        <p>
          You understand that by creating an Account, adding to and changing
          your Profile Information and using the Service, you consent and agree
          to the collection and use of certain information about you and your
          use of the Service in accordance with our {PRIVACY_POLICY}.
          Information collected when you use the Service may include technical
          or diagnostic information related to your use that may be used by us
          to maintain, improve and enhance the Service. For more information
          please read our full {PRIVACY_POLICY}.
        </p>

        <h2>
          <span className="sec">8.</span> Content and Your Conduct
        </h2>

        <h3>Content</h3>
        <p>
          “<b>Content</b>” means any information that may be generated or
          encountered through use of the Service, such as data files, written
          text, software, music, graphics, photographs, images, sounds, videos,
          messages and any other similar materials. You understand that you, and
          not Gamer One, are solely responsible for any Content you upload,
          download, post, email, transmit, store or otherwise make available
          through your use of the Service. You understand that by using the
          Service you may encounter Content you may find offensive, indecent or
          objectionable, and that you may expose others to Content that they may
          find offensive, indecent or objectionable. We do not control any
          Content posted using the Service, nor do we guarantee the accuracy,
          integrity or quality of any such Content. You understand and agree
          that your use of the Service and any Content is solely at your own
          risk.
        </p>

        <h3>Your Conduct</h3>
        <p>You agree that you will NOT use the Service to:</p>
        <ol type="a">
          <li>
            upload, download, post, email, transmit, store or otherwise make
            available any Content that is unlawful, harassing, threatening,
            harmful, defamatory, abusive, obscene, invasive of another’s
            privacy, hateful, racially or ethnically offensive, or otherwise
            objectionable;
          </li>
          <li>stalk, harass, threaten or harm another person;</li>
          <li>
            impersonate or misrepresent yourself as another person (including a
            celebrity), entity, another Gamer One subscriber or a Gamer One
            employee, or otherwise misrepresent your affiliation with a person
            or entity. We reserve the right to reject or block any user name
            that could be deemed to be an impersonation or misrepresentation of
            your identity, or a misappropriation of another person’s name or
            identity;
          </li>
          <li>
            engage in any activity that infringes the intellectual property
            rights of another person;
          </li>
          <li>
            post, send, transmit or otherwise make available any unsolicited or
            unauthorized messages, advertising, promotional materials, junk
            mail, spam or chain letters;
          </li>
          <li>
            forge any TCP-IP packet header or any part of the header information
            in an email or a posting, or otherwise putting information in a
            header designed to mislead recipients as to the origin of any
            Content transmitted through the Service (known as “spoofing”);
          </li>
          <li>
            upload, post, email, transmit, store or otherwise make available any
            material that contains viruses or any other computer code, files or
            programs designed to harm, interfere or limit the normal operation
            of the Service (or any part thereof) or any other computer software
            or hardware;
          </li>
          <li>
            interfere with or disrupt the Service (including accessing the
            Service through any automated means, like scripts or web crawlers),
            or any servers or networks connected to the Service, or any
            policies, requirements or regulations of networks connected to the
            Service (including any unauthorized access to, use or monitoring of
            data or traffic thereon);{' '}
          </li>
          <li>plan or engage in any illegal activity; or</li>
          <li>
            gather and store personal information on any other users of the
            Service to be used in connection with any of the foregoing
            prohibited activities.
          </li>
        </ol>

        <h3>Removal of Content</h3>
        <p>
          You acknowledge that we are not responsible or liable for any Content
          provided by others and that we have no duty to pre-screen any Content
          or to monitor any activity conducted on the Service. However, we
          reserve the right to determine whether Content is appropriate and in
          compliance with these Terms, and may pre-screen, move, refuse, modify
          and/or remove Content at any time, without prior notice and in our
          sole discretion, if such Content is found to be in violation of these
          Terms or is otherwise objectionable.
        </p>

        <h3>Backup Your Content</h3>
        <p>
          You are responsible for backing up, to your Device or to other storage
          media, any important documents, images or other Content that you store
          or access via the Service. We do not guarantee or warrant that any
          Content you may store or access through the Service will not be
          subject to inadvertent damage, corruption or loss.
        </p>

        <h3>Access to Your Account, Profile Information and Content</h3>

        <p>
          You acknowledge and agree that we may access, use, preserve and/or
          disclose your Account and/or your Profile Information and Content if
          we are legally required to do so or if we have a good faith belief
          that such access, use, disclosure or preservation is reasonably
          necessary to: (a) comply with legal process or request; (b) enforce
          these Terms, including investigation of any potential violation
          thereof; (c) detect, prevent or otherwise address security, fraud or
          technical issues; or (d) protect the rights, property or safety of
          Gamer One, its users or the public as required or permitted by law.
        </p>

        <h3>Violations of These Terms</h3>

        <p>
          If while using the Service, you encounter Content you find
          inappropriate, or otherwise believe to be a violation of these Terms,
          then you may report it by sending an email to us at {SUPPORT_EMAIL}.
        </p>

        <h2>
          <span className="sec">9.</span> Content Submitted or Made Available by
          You on the Service
        </h2>

        <h3>License from You</h3>
        <p>
          Except for material we may license to you, we do not claim ownership
          of the materials or Content you submit or make available on the
          Service. However, by submitting or posting any Content on areas of the
          Service that are accessible by the public, you grant us a worldwide,
          royalty-free and non-exclusive license to use, distribute, reproduce,
          modify, adapt, publish, translate, publicly perform and publicly
          display that Content on the Service solely for the purpose for which
          that Content was submitted or made available. This license will
          terminate within a commercially reasonable time after you or Gamer One
          removes that Content from the public area. By submitting or posting
          Content on areas of the Service that are accessible by the public, you
          are representing that you are the owner of that Content or have the
          legal authority to distribute or publish it.
        </p>
        <h3>Changes to Content</h3>
        <p>
          You understand that in order to provide the Service and make your
          Content available on the Service, we may transmit your Content across
          various public networks, in various media, and modify or change your
          Content to comply with technical requirements of connecting networks
          or devices. You agree that your license to us permits us to take any
          such actions.
        </p>
        <h2>
          <span className="sec">10.</span> Trademark Information
        </h2>
        <p>
          GAMER ONE and other Gamer One trademarks, service marks, graphics and
          logos used in connection with the Service are trademarks or registered
          trademarks of Gamer One Entertainment Inc. in Canada and/or other
          countries. Other trademarks, service marks, graphics and logos used in
          connection with the Service may be the trademarks of their respective
          owners. You are granted no right or license in any of those
          trademarks, and you agree that you will not remove, obscure, or alter
          any proprietary notices (including trademark and copyright notices)
          that may be affixed to or contained within the Service.
        </p>
        <h2>
          <span className="sec">11.</span> Intellectual Property Matters
        </h2>

        <h3>Gamer One’s Proprietary Rights</h3>
        <p>
          You acknowledge and agree that Gamer One and/or its licensors own all
          legal right, title and interest in and to the Service, and any
          software (including any Content provided therein) provided by Gamer
          One to you as a part of or in connection with the Service (“
          <b>Software</b>”), including any and all intellectual property rights
          that exist therein, whether registered or not, and wherever in the
          world they may exist. You further agree that the Service (including
          the Software, or any other part thereof) contains proprietary and
          confidential information that is protected by applicable intellectual
          property and other laws.
        </p>

        <h3>License From Gamer One</h3>
        <p>
          Gamer One grants you a personal, non-exclusive, non-transferable,
          limited license to use the Software as provided to you by Gamer One as
          a part of the Service and in accordance with these Terms; provided
          that you do not (and do not permit anyone else to) copy, modify,
          create a derivative work of, reverse engineer, decompile, or otherwise
          attempt to discover the source code (unless expressly permitted or
          required by law), sell, lease, sublicense, assign, grant a security
          interest in or otherwise transfer any right in the Software. Your
          right to access and use Third Party Platforms is subject to and
          governed by the terms of use and privacy policies of the applicable
          Third Party Platform licensors.
        </p>
        <h3>Export Control</h3>
        <p>
          Use of the Service and Software, including transferring, posting, or
          uploading data, software or other Content via the Service, may be
          subject to the export and import laws of Canada and other countries.
          You agree to comply with all applicable export and import laws and
          regulations. You also agree that you will not use the Software or
          Service for any purposes prohibited by Canadian law.
        </p>
        <h3>Software Updates</h3>
        <p>
          As part of the Service, you may from time to time receive updates to
          the Software from us that may be automatically downloaded and
          installed to your Device. These updates may include bug fixes, feature
          enhancements or improvements, or entirely new versions of the
          Software. You agree that we can automatically deliver those updates to
          you as part of the Service and that you will receive and install them
          as required.
        </p>
        <h2>
          <span className="sec">12.</span> Termination
        </h2>
        <h3>Termination by You</h3>
        <p>
          You may terminate your Account and/or stop using the Service at any
          time.
        </p>
        <h3>Termination by Us </h3>
        <p>
          We may at any time, under certain circumstances and without prior
          notice, immediately terminate or suspend all or a portion of your
          Account and/or your access to the Service. Cause for termination will
          include, but not be limited to: (a) violations of these Terms or any
          other policies or guidelines that are referenced in these Terms
          (including our {PRIVACY_POLICY}) and/or posted on the Service; (b) a
          request by you to cancel or terminate your Account; (c) discontinuance
          or material modification to the Service or any part thereof; (d) a
          request and/or order from law enforcement, a judicial body or other
          government agency; (e) where provision of the Service to you is or may
          become unlawful; (f) unexpected technical or security issues or
          problems; or (g) your participation in fraudulent or illegal activity.
          Any such termination or suspension will be made by us in our sole
          discretion, and we will not be responsible to you or any third party
          for any damages that may result or arise out of such termination or
          suspension of your Account or access to the Service.
        </p>
        <h3>Effects of Termination</h3>
        <p>
          Upon termination of your Account you lose all access to the Service
          and any portions thereof, including, but not limited to, your Account,
          your Profile Information and your Content. Following termination, we
          will manage your Profile Information and Content in accordance with
          the terms of our {PRIVACY_POLICY}.
        </p>
        <h2>
          <span className="sec">13.</span> Links and Third Party Materials
        </h2>
        <p>
          Certain Content, components or features of the Service, including
          Third Party Platforms, may include materials from third parties or
          hyperlinks to other web sites, resources or Content. Because we have
          no control over those sites or materials, you acknowledge and agree
          that we are not responsible for the availability of those sites or
          resources, and do not endorse or warrant the accuracy of any of those
          sites or resources, and will in no way be liable or responsible for
          any Content, advertising, products or materials on or available from
          those sites or resources. You further acknowledge and agree that we
          are not responsible or liable for any damages you incur or allege to
          have incurred, either directly or indirectly, as a result of your use
          and/or reliance upon any Content, advertising, products or materials
          on or available from those other sites or resources.
        </p>

        <h2>
          <span className="sec">14.</span> Disclaimer of Warranties
        </h2>
        <p>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES.
          AS SUCH, TO THE EXTENT SPECIFICALLY PROHIBITED BY APPLICABLE LAW, SOME
          OF THE EXCLUSIONS SET OUT BELOW MAY NOT APPLY TO YOU. YOU UNDERSTAND
          AND AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK AND THE
          SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. GAMER ONE
          AND ITS AFFILIATES, SUBSIDIARIES, OFFICERS, DIRECTORS, EMPLOYEES,
          AGENTS, PARTNERS, ADVERTISORS, SPONSORS, ADVISORS AND LICENSORS
          EXPRESSLY DISCLAIM ALL REPRESENTATIONS, WARRANTIES AND CONDITIONS OF
          ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE AND NON-INFRINGEMENT. GAMER ONE AND ITS AFFILIATES,
          SUBSIDIARIES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS,
          ADVERTISORS, SPONSORS, ADVISORS AND LICENSORS MAKE NO REPRESENTATION
          OR WARRANTY THAT (a) THE SERVICE WILL MEET YOUR REQUIREMENTS; (b) YOUR
          USE OF THE SERVICE WILL BE TIMELY, UNINTERRUPTED, SECURE OR
          ERROR-FREE; (c) ANY INFORMATION OBTAINED BY YOU AS A RESULT OF THE
          SERVICE WILL BE ACCURATE OR RELIABLE; OR (d) ANY DEFECTS OR ERRORS IN
          THE SOFTWARE PROVIDED TO YOU AS PART OF THE SERVICE CAN OR WILL BE
          CORRECTED.
        </p>
        <p>
          ANY MATERIAL TRANSMITTED, STORED, ACCESSED OR OTHERWISE MAINTAINED
          THROUGH THE USE OF THE SERVICE IS DONE SO AT YOUR OWN DISCRETION AND
          RISK, AND YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR
          LOSS OR CORRUPTION OF DATA THAT RESULTS FROM ANY USE OF THE SERVICE.
          NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU
          FROM GAMER ONE OR THROUGH OR FROM THE SERVICE WILL CREATE ANY
          REPRESENTATION, WARRANTY OR CONDITION NOT EXPRESSLY STATED IN THESE
          TERMS.
        </p>
        <p>
          THIS SECTION WILL SURVIVE THE TERMINATION OR EXPIRATION OF THESE TERMS
          AND/OR YOUR USE OF THE SERVICE.
        </p>
        <h2>
          <span className="sec">15.</span> Limitation of Liability
        </h2>
        <p>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. AS SUCH, TO THE
          EXTENT SPECIFICALLY PROHIBITED BY APPLICABLE LAW, SOME OF THE
          EXCLUSIONS OR LIMITATIONS SET OUT BELOW MAY NOT APPLY TO YOU.
        </p>
        <p>
          YOU EXPRESSLY UNDERSTAND AND AGREE THAT GAMER ONE AND ITS AFFILIATES,
          SUBSIDIARIES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS,
          ADVERTISERS, SPONSORS, ADVISORS AND LICENSORS WILL NOT BE LIABLE TO
          YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR
          EXEMPLARY DAMAGES, OR FROM ANY DAMAGES FOR LOSS OF PROFITS, GOODWILL,
          USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF GAMER ONE HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM YOUR
          ACCESS TO OR USE OF THE SERVICE, INCLUDING: (a) YOUR USE OR INABILITY
          TO USE THE SERVICE; (b) ANY CHANGES MADE TO THE SERVICE OR ANY
          TEMPORARY OR PERMANENT CESSATION OF THE SERVICE OR ANY PART THEREOF;
          (c) THE UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR
          DATA; (d) THE DELETION OF, CORRUPTION OF, OR FAILURE TO STORE AND/OR
          SEND OR RECEIVE YOUR TRANSMISSIONS OR DATA ON OR THROUGH THE SERVICE;
          OR (e) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE.
        </p>
        <p>
          BY PARTICIPATING IN MULTI-PLAYER GAMES OR VISITING CHAT ROOMS YOU MAY
          BE EXPOSED TO RUDE, CRUDE, INDECENT OR OTHER OFFENSIVE LANGUAGE OR
          REFERENCES. YOU AGREE THAT GAMER ONE WILL NOT BE RESPONSIBLE FOR ANY
          LOSS OR DAMAGE RELATING TO YOUR DEALINGS WITH ANY THIRD PARTY
          ADVERTISER OR CONTENT PROVIDER ON THE SERVICE.
        </p>
        <p>
          THIS SECTION WILL SURVIVE THE TERMINATION OR EXPIRATION OF THESE TERMS
          AND/OR YOUR USE OF THE SERVICE.
        </p>
        <h2>
          <span className="sec">16.</span> Indemnity
        </h2>
        <p>
          You agree to defend, indemnify and hold harmless Gamer One, its
          affiliates, subsidiaries, officers, directors, employees, agents,
          partners, advertisers, sponsors, advisors and licensors from any claim
          or demand, including reasonable legal fees and expenses, made by a
          third party, relating to or arising from: (a) any Content you submit,
          post, transmit, or otherwise make available through the Service; (b)
          your use of the Service; (c) any violation of these Terms by you; or
          (d) your violation of any rights of another. This obligation will
          survive the termination or expiration of these Terms and/or your use
          of the Service.
        </p>
        <h2>
          <span className="sec">17.</span> Notices
        </h2>
        <p>
          We may provide you with notices regarding the Service, including
          changes to these Terms, by email or by postings on our website and/or
          the Service.
        </p>

        <h2>
          <span className="sec">18.</span> Governing Law
        </h2>
        <p>
          Any litigation or other dispute resolution between you and Gamer One
          arising out of or relating to these Terms, our {PRIVACY_POLICY} or
          your use of the Service will take place in Vancouver, British
          Columbia, and you hereby consent to the personal jurisdiction and
          exclusive venue of the Courts of the Province of British Columbia with
          respect to any such litigation or dispute resolution. These Terms and
          our {PRIVACY_POLICY} will be governed by and construed in accordance
          with the laws of the Province of British Columbia and the laws of
          Canada applicable therein, excluding that body of British Columbia law
          concerning conflicts of laws. The parties expressly exclude the
          application of the{' '}
          <i>
            United Nations Convention on Contracts for the International Sale of
            Goods
          </i>
          , and all implementing legislation thereunder.
        </p>
        <p>
          ALL CLAIMS AGAINST GAMER ONE MUST BE BROUGHT IN YOUR OWN CAPACITY, AND
          NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
          REPRESENTATIVE PROCEEDING. YOU AGREE THAT, BY REGISTERING AN ACCOUNT
          AND/OR USING THE SERVICE, YOU ARE WAIVING THE RIGHT TO A TRIAL BY JURY
          OR TO PARTICIPATE IN A CLASS ACTION.
        </p>

        <h2>
          <span className="sec">19.</span> General
        </h2>
        <p>
          These Terms and our {PRIVACY_POLICY} constitute the entire agreement
          between you and Gamer One and govern your use of the Service. You may
          also be subject to additional terms and conditions that may apply when
          you use affiliate services, third-party content or third-party
          software. If any part of these Terms is held invalid or unenforceable,
          then that portion will be construed in a manner consistent with
          applicable law to reflect, as nearly as possible, the original
          intentions of the parties, and the remaining portions will remain in
          full force and effect. The failure of Gamer One to exercise or enforce
          any right or provision of these Terms will not constitute a waiver of
          that right or provision. You agree that, except as otherwise expressly
          provided in these Terms, there are no third-party beneficiaries to
          this Agreement You agree that any provision of these Terms or our
          {PRIVACY_POLICY} that must survive in order to allow us to enforce its
          meaning will survive the termination of these Terms, provided that any
          claim or cause of action arising out of or related to these Terms, our
          {PRIVACY_POLICY} or the Service must be filed within one year after
          the cause of action arose or it will be forever barred.
        </p>
      </section>
    </Page>
  );
};

export default Terms;
