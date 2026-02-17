import {
  RestaurantGeneralInfo,
  SocialMedia,
} from "@/dtos/about-establishment.dto";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { Globe, MapPin } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import {
  FaFacebook,
  FaPhoneAlt,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

type EstablishmentDetailsProps = {
  establishmentData: RestaurantGeneralInfo;
  establishmentAddress: {
    street: string | null;
    number: string | null;
    neighborhood: string | null;
    city: string | null;
  };
};

const ICON_MAP: Record<string, React.ElementType> = {
  instagram: BsInstagram,
  facebook: FaFacebook,
  twitter: FaTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

const EstablishmentDetails = ({
  establishmentData,
  establishmentAddress,
}: EstablishmentDetailsProps) => {
  const contacts = establishmentData.contacts;

  const socialMedia = establishmentData?.socialMedia ?? {};
  const socials = Array.isArray(socialMedia)
    ? (socialMedia as SocialMedia[])
    : [];

  if (socials.length === 0) return null;

  return (
    <section>
      <h1 className="my-4 text-center text-3xl font-bold">
        {establishmentData.name}
      </h1>
      <ul className="w-full space-y-4">
        <li className="flex items-center gap-2">
          <MapPin className="inline-block h-6 w-6 text-orange-700" />
          <span className="max-w-[80%] text-base">
            {establishmentAddress.street}, {establishmentAddress.number} -{" "}
            {establishmentAddress.neighborhood} - {establishmentAddress.city}
          </span>
        </li>
        {Array.isArray(contacts) && contacts[0]?.number && (
          <li className="flex items-center gap-2">
            <FaWhatsapp className="inline-block h-6 w-6 text-green-500" />
            <span className="text-lg">
              {formatPhoneNumber(contacts[0].number)}
            </span>
          </li>
        )}
        {Array.isArray(contacts) && contacts[1]?.number && (
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="inline-block h-6 w-6 text-blue-500" />
            <span className="text-lg">
              {formatPhoneNumber(contacts[1].number)}
            </span>
          </li>
        )}
      </ul>
      <div className="flex flex-col gap-2 py-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Redes Sociais
        </h3>
        <div className="flex flex-wrap gap-2">
          {socials.map((social, index) => {
            const iconKey = social.name.toLowerCase();
            const Icon = ICON_MAP[iconKey] || Globe;

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EstablishmentDetails;
