const Teste = () => {
  return (
    <div className="space-y-4">
      <FormLabel>Contatos</FormLabel>
      {contacts.map((contact, index) => (
        <div key={index} className="flex items-center gap-2">
          <FormControl>
            <Input
              placeholder={`Contato ${index + 1} (ex: 11999999999)`}
              value={contact}
              onChange={(e) => updateContact(index, e.target.value)}
              className="flex-1"
            />
          </FormControl>
          {index > 0 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeContact(index)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addContact}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Adicionar Contato
      </Button>

      {/* Campo hidden para validação do React Hook Form */}
      <FormField
        control={form.control}
        name="contacts"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
