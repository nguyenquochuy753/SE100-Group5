import { useContactQuery } from '@framework/contact/contact';
import ContactBox from './contact-content';

const ContactPage: React.FC = ({setTenKhachHang, setSdt}) => {
  let { data, isLoading } = useContactQuery();
  return !isLoading ? (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full">
          <ContactBox items={data} setTenKhachHang={setTenKhachHang} setSdt={setSdt}/>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ContactPage;
