import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const FormSchema = z.object({
    titre: z.string().min(1, 'Titre is required'),
    nom: z.string().min(1, 'Nom is required'),
    prenom: z.string().min(1, 'Prénom is required'),
    adresse: z.string().min(1, 'Adresse is required'),
    codePostal: z.string().min(1, 'Code postal is required'),
    dateNaissance: z.string().min(1, 'Date de naissance is required'),
    quantiteAppareilles: z.number().min(1, 'Quantité appareilles is required'),
    numeroTelephone1: z.string().min(1, 'Numéro de téléphone 1 is required'),
    numeroTelephone2: z.string().min(1, 'Numéro de téléphone 2 is required'),
});
type Centre = {
    value: string
    label: string
}

const centre: Centre[] = [
    {
        value: "backlog",
        label: "Backlog",
    },
    {
        value: "todo",
        label: "Todo",
    },
    {
        value: "in progress",
        label: "In Progress",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "canceled",
        label: "Canceled",
    },
]
const AppointmentForm = ({ selectedDateTime, onClose }) => {
    const [dateRendezVous, heureRendezVous] = selectedDateTime.replace('Date: ', '').replace('Time: ', '').split(', ');

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [filteredCentre, setFilteredCentre] = useState(centre);
    const selectedStatus = selectedIndex >= 0 ? centre[selectedIndex] : null;
    const handleSelect = (item) => {
        const index = centre.findIndex((centreItem) => centreItem.value === item.value);
        setSelectedIndex(index);
    };
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            titre: '',
            nom: '',
            prenom: '',
            adresse: '',
            codePostal: '',
            dateNaissance: '',
            quantiteAppareilles: 1,
            dateRendezVous,
            heureRendezVous,
        },
    });

    function onSubmit(data) {
        toast({
            title: 'Appointment submitted',
            description: JSON.stringify(data, null, 2),
        });
        onClose();
    }

    return (
        <div className="flex justify-between">
            <Card className="w-1/2 p-4 m-5"> {/* Add padding to the card */}
                <CardHeader className="text-center">
                    <CardTitle>Détails du rendez-vous</CardTitle>
                    <CardDescription>Tous les champs sont obligatoires.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                            <FormField
                                control={form.control}
                                name="titre"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Titre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormItem className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="dateRendezVous"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Date de Rendez-Vous</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="heureRendezVous"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Heure de Rendez-Vous</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                            </FormItem>

                            <FormItem className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="nom"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="prenom"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                            </FormItem>

                            <FormItem className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="numeroTelephone1"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Numéro de Téléphone 1</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="numeroTelephone2"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Numéro de Téléphone 2</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                            </FormItem>

                            <FormItem className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="adresse"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Ville</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="codePostal"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Code Postal</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                            </FormItem>
                            <FormItem className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="dateNaissance"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Date de Naissance</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantiteAppareilles"
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1">
                                            <FormLabel>Quantité d'Appareilles</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                        </div>
                                    )}
                                />
                            </FormItem>

                            <div className="flex justify-center my-[10px]">
                                <Button type="submit" className='mt-[20px] px-[47%]'>Planifier</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="w-1/2 flex flex-col items-center">
                <div className="w-full flex justify-center">
                    <Input
                        type="text"
                        placeholder="Search status..."
                        className="w-[150px] mb-4"
                        onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            setFilteredCentre(
                                centre.filter((item) =>
                                    item.label.toLowerCase().includes(searchTerm)
                                )
                            );
                        }}
                    />
                </div>
                <div className="w-full flex justify-center">
                    <Carousel className="max-w-xs">
                        <CarouselContent className='w-[300px]'> {/* Set a fixed height for the CarouselContent */}
                            {filteredCentre.map((item) => (
                                <CarouselItem key={item.value} onClick={() => handleSelect(item)}>
                                    <div className={`p-4 ${selectedStatus?.value === item.value ? 'bg-blue-100' : ''}`}>
                                        <Card>
                                            <CardContent className="flex items-center justify-center p-6">
                                                <span className="text-lg font-semibold">{item.label}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="w-full mt-4 flex justify-center">
                    <Card className="w-[700px] h-[400px]"> {/* Set custom width and height */}
                        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                            <span className="text-lg font-semibold">
                                {selectedStatus ? selectedStatus.label : 'No status selected'}
                            </span>
                            <img src="https://via.placeholder.com/200" alt="Placeholder" className="w-full h-[250px]" />
                            <span className="text-md">
                                {selectedStatus ? `Details for ${selectedStatus.label}` : ''}
                            </span>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;
