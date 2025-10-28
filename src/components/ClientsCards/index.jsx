import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const ClientsCards = ({ clients }) => {
  return (
    <section className="flex flex-wrap justify-center gap-4">
      {clients.map((client) => (
        <Card key={client.name} className="p-0">
          <CardContent
            className="bg-[var(--brand-primary)] relative flex h-[200px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg p-4"
            style={{ ['--brand-primary']: Array.isArray(client.brandColors) ? client.brandColors[0] : '#111827' }}
          >
            <div className="relative h-[120px] w-[250px]">
              <Image
                src={client.avatarImageUrl}
                alt={client.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center text-lg font-bold text-white">
              {client.name}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default ClientsCards;
