import cn from 'classnames';
import styles from './PolicyPage.module.sass';

import Sidebar from './Sidebar';
import PageContent from '../../components/PageContent';
import Header from './Header';

function PolicyPage() {
  return (
    <div className={styles.page}>
      <Sidebar className={cn(styles.sidebar, { [styles.visible]: true })} />
      <Header />

      <div className={styles.inner}>
        <PageContent wide>
          <p className="fs-1">Privacy Policy</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            This Privacy Policy governs the manner in which KEE Education
            Company Limited. d/b/a {process.env.REACT_APP_PROJECT_NAME}{' '}
            collects, uses, maintains and discloses information collected from
            users (each, a “User”) of the {process.env.REACT_APP_PROJECT_URL}{' '}
            website (“Site”), and individuals who are third-party content
            authors of social media content (“Social Media Authors”).
          </p>
          <p className="fs-3">Personal identification information</p>
          <p className="fs-6 py-2 fw-bold">Users</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            <li className="ms-4">
              We may collect personal identification information from Users in a
              variety of ways, including, but not limited to, when Users visit
              our site, register on the site, and in connection with other
              activities, services, features or resources we make available on
              our Site.
            </li>
            <li className="ms-4">
              Users may be asked for, as appropriate, name, email address, and
              phone number.
            </li>
            <li className="ms-4">
              Users may, however, visit our Site anonymously. We will collect
              personal identification information from Users only if they
              voluntarily submit such information to us.
            </li>
            <li className="ms-4">
              Users can always refuse to supply personal identification
              information, except that it may prevent them from engaging in
              certain Site-related activities.
            </li>
          </p>
          <p className="fs-6 py-2 fw-bold">Social Media Authors</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            {process.env.REACT_APP_PROJECT_NAME} receives personal data from
            third parties such as Facebook, Twitter, Instagram, and YouTube for
            our legitimate interests of serving our customers. We are fully
            compliant with their public terms and conditions and trust them to
            protect Social Media Authors through their robust privacy policies.
            <li className="ms-4">
              {process.env.REACT_APP_PROJECT_NAME} collects, uses, processes and
              stores information that has been made publicly available on the
              Social Media platforms listed above such as: names, usernames,
              handles, or other identifiers; the content of the information
              published via that name, username, handle, or other identifier,
              including comments, expressions, opinions, posts, etc.; profile
              pictures or other images or videos posted or interacted with;
              publicly disclosed location; gender; We may also use this
              information to infer other data, such as the sentiment of the
              post.
            </li>
            <li className="ms-4">
              To collect & provide customers with data about their YouTube
              channels, {process.env.REACT_APP_PROJECT_NAME} uses YouTube’s API
              Services. Google’s Privacy Policy can be found here.
            </li>
            <li className="ms-4">
              In addition to our normal procedure for deleting stored data, you
              can revoke {process.env.REACT_APP_PROJECT_NAME}’s access to your
              YouTube data via the Google security settings page.
            </li>
          </p>
          <p className="fs-3">Rights of Users and Social Media Authors</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            At any time, you may contact colorme.job@gmail.com and request that
            we:
            <li className="ms-4">
              Rectify personal data {process.env.REACT_APP_PROJECT_NAME} has
              collected
            </li>
            <li className="ms-4">
              {' '}
              Provide you with a copy of your personal data{' '}
            </li>
            <li className="ms-4">
              Permanently delete any personal or non-personal data (such as
              cookies) that we have collected and shared
            </li>
            <li className="ms-4">Refuse any use which relates to marketing</li>
          </p>
          <p className="fs-3">Non-personal identification information</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            We may collect non-personal identification information about Users
            whenever they interact with our Site. Non-personal identification
            information may include the browser name, the type of computer and
            technical information about Users’ means of connection to our Site,
            such as the operating system and the Internet service providers
            utilized and other similar information.
          </p>
          <p className="fs-3">Users</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            {process.env.REACT_APP_PROJECT_NAME} may collect and use Users
            personal information for the following purposes:
            <li className="ms-4">
              To improve customer service. Information you provide helps us
              respond to your customer service requests and support needs more
              efficiently.
            </li>
            <li className="ms-4">
              To personalize user experience. We may use information in the
              aggregate to understand how our Users as a group use the services
              and resources provided on our Site.
            </li>
            <li className="ms-4">
              To improve our Site. We may use feedback you provide to improve
              our products and services.
            </li>
            <li className="ms-4">
              To process payments. We may use the information Users provide
              about themselves when placing an order only to provide service to
              that order. We do not share this information with outside parties
              except to the extent necessary to provide the service.
            </li>
            <li className="ms-4">
              To run a promotion, contest, survey or other Site feature.
            </li>
            <li className="ms-4">
              To send Users information they agreed to receive about topics we
              think will be of interest to them.
            </li>
            <li className="ms-4">To send periodic emails.</li>
            <li className="ms-4">
              We may use the email address to send User information and updates
              pertaining to their order.
            </li>
            <li className="ms-4">
              It may also be used to respond to their inquiries, questions,
              and/or other requests.
            </li>
            <li className="ms-4">
              If User decides to opt-in to our mailing list, they will receive
              emails that may include company news, updates, related product or
              service information, etc. If at any time the User would like to
              unsubscribe from receiving future emails, we include detailed
              unsubscribe instructions at the bottom of each email.
            </li>
          </p>
          <p className="fs-3">Social Media Authors</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            The legal basis for the data that we collect and process is pursuant
            to our legitimate interests in providing our Services to our
            customers.
            <p>
              Your information is also used in the following ways:
              <li className="ms-4">
                To allow our customers to learn more about their brand,
                customers, and competitors;
              </li>
              <li className="ms-4">To improve our Services.</li>
            </p>
          </p>
          <p className="fs-3">How we protect your information</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            We adopt appropriate data collection, storage and processing
            practices and security measures to protect against unauthorized
            access, alteration, disclosure or destruction of your personal
            information, username, password, transaction information and data
            stored on our Site. In compliance with our company’s values, you
            will always be immediately notified in the unlikely event of data
            breach.
          </p>
          <p className="fs-3">Sharing your personal information</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            {' '}
            We do not sell, trade, or rent Users’ personal identification
            information to others. We may share generic aggregated demographic
            information not linked to any personal identification information
            regarding visitors and users with our business partners, trusted
            affiliates and advertisers for the purposes outlined above. We may
            use third-party service providers to help us operate our business
            and the Site or administer activities on our behalf, such as sending
            out newsletters or surveys. We may share your information with these
            third parties for those limited purposes provided that you have
            given us your permission.
          </p>
          <p className="fs-3">Social Media Authors</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            We share your data with our Customers in the ways outlined in
            Personal identification information.
          </p>
          <p className="fs-3">Third party websites</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            Users may find advertising or other content on our Site that link to
            the sites and services of our partners, suppliers, advertisers,
            sponsors, licensors and other third parties. We do not control the
            content or links that appear on these sites and are not responsible
            for the practices employed by websites linked to or from our Site.
            In addition, these sites or services, including their content and
            links, may be constantly changing. These sites and services may have
            their own privacy policies and customer service policies. Browsing
            and interaction on any other website, including websites which have
            a link to our Site, is subject to that website’s own terms and
            policies.
          </p>
          <p className="fs-3">Changes to this privacy policy</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            {process.env.REACT_APP_PROJECT_NAME} has the discretion to update
            this privacy policy at any time. When we do, we will revise the
            updated date at the bottom of this page. We encourage Users to
            frequently check this page for any changes to stay informed about
            how we are helping to protect the personal information we collect.
            You acknowledge and agree that it is your responsibility to review
            this privacy policy periodically and become aware of modifications.
          </p>
          <p className="fs-3">Your acceptance of these terms</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            By using this Site, you signify your acceptance of this policy. If
            you do not agree to this policy, please do not use our Site. Your
            continued use of the Site following the posting of changes to this
            policy will be deemed your acceptance of those changes.
          </p>
          <p className="fs-3">Contacting us</p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            If you have any questions about this Privacy Policy, the practices
            of this site, or your dealings with this site, please contact us at:
            Company name: KEE EDUCATION COMPANY LIMITED
          </p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            <li className="ms-4">
              Address: 175 Chua Lang Street, Lang Thuong Ward, Dong Da District,
              Hanoi City, Vietnam
            </li>
            <li className="ms-4">Legal representative: Nguyễn Việt Hùng </li>
            <li className="ms-4">Phone: 024 3550 0333</li>
          </p>
          <p className="fs-6 fw-normal pt-2 pb-1">
            This document was last updated on March 30th 2023.
          </p>
        </PageContent>
      </div>
    </div>
  );
}

export default PolicyPage;
