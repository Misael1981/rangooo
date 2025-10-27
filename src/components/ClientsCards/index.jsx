import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const ClientsCards = ({ clients }) => {
  return (
    <section className="flex flex-wrap justify-center gap-4">
      {clients.map((client) => (
        <Card key={client.name} className="p-0">
          <CardContent
            className={`${client.color} relative h-[200px] w-[300px] rounded-lg p-4`}
          >
            <Image
              src={client.image}
              alt={client.name}
              fill
              className="object-contain"
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default ClientsCards;
