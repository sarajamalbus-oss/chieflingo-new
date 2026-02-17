import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
    return (
        <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button>Defult</Button>
            <Button variant="primary">Primary</Button>
                        <Button variant="primaryOutline">Primary Outline</Button>


                        <Button variant="secondary">Secondary</Button>
                        <Button variant="secondaryOutline">Secondary Outline</Button>


                        <Button variant="danger">Danger</Button>
                        <Button variant="dangerOutline">Danger Outline</Button>



                         <Button variant="Super">Super</Button>
                        <Button variant="SuperOutline">Super Outline</Button>


                        <Button variant="Ghost">Ghost</Button>



                        <Button variant="Sidebar">Sidebar</Button>
                        <Button variant="SidebarOutline">Sidebar Outline</Button>
                        

        </div>
    );
};

export default ButtonsPage;
