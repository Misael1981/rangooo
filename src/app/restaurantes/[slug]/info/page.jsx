import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import HeaderInfosPage from "../components/HeaderInfosPage";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { getContactsByRestaurantId } from "@/data/get-contacts-by-restaurant-id";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import MapsLocation from "./components/MapsLocation";

export default async function Page({ params }) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  const social = restaurant?.socialMedia ?? {};
  const instagramHandle =
    typeof social.instagram === "string" && social.instagram.trim()
      ? social.instagram.trim()
      : null;
  const facebookHandle =
    typeof social.facebook === "string" && social.facebook.trim()
      ? social.facebook.trim()
      : null;

  const instagramUrl = instagramHandle
    ? instagramHandle.startsWith("http")
      ? instagramHandle
      : `https://www.instagram.com/${instagramHandle.replace(/^@/, "")}`
    : null;
  const facebookUrl = facebookHandle
    ? facebookHandle.startsWith("http")
      ? facebookHandle
      : `https://www.facebook.com/${facebookHandle.replace(/^@/, "")}`
    : null;
  const contacts = await getContactsByRestaurantId(restaurant.id);

  function formatPhoneNumber(phone) {
    // Remove o +55 e espaços extras
    const cleaned = phone.replace("+55", "").trim();

    // Usa regex pra capturar o DDD e o número
    const match = cleaned.match(/^(\d{2})\s?(\d{4,5}-?\d{4})$/);

    if (!match) return "Formato inválido";

    const [, ddd, number] = match;
    return `(${ddd}) ${number.replace("-", "-")}`;
  }
  return (
    <div className="w-full">
      <HeaderInfosPage title="Informações" />
      <div className="w-full space-y-4 p-4">
        <section>
          <h1 className="my-10 text-center text-3xl font-bold">
            {restaurant.name}
          </h1>
          <ul className="w-full space-y-4">
            <li className="flex items-center gap-8">
              <MapPin className="inline-block h-6 w-6 text-orange-700" />
              <span className="max-w-[80%] text-lg">{restaurant.address}</span>
            </li>
            <li className="flex items-center gap-8">
              <FaWhatsapp className="inline-block h-6 w-6 text-green-500" />
              <span className="text-lg">
                {formatPhoneNumber(contacts[0].number)}
              </span>
            </li>
            <li className="flex items-center gap-8">
              <FaPhoneAlt className="inline-block h-6 w-6 text-blue-500" />
              <span className="text-lg">
                {formatPhoneNumber(contacts[1].number)}
              </span>
            </li>
            {instagramUrl && (
              <li className="flex items-center gap-8">
                <FaInstagram className="inline-block h-6 w-6 text-pink-500" />
                <a
                  href={instagramUrl}
                  className="text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nos siga no Instagram
                </a>
              </li>
            )}
            {facebookUrl && (
              <li className="flex items-center gap-8">
                <FaFacebook className="inline-block h-6 w-6 text-blue-500" />
                <a
                  href={facebookUrl}
                  className="text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nos siga no Facebook
                </a>
              </li>
            )}
          </ul>
        </section>
        <section className="h-[300px] w-full max-w-[600px] rounded-md border border-solid border-gray-800 bg-slate-100 p-4">
          <MapsLocation address={restaurant.address} />
        </section>
      </div>
    </div>
  );
}
