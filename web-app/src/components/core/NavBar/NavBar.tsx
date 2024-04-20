"use client"
import {
    DropdownItem, DropdownMenu,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {useState} from "react";
import {Input} from "@nextui-org/input";
import {SearchIcon, TagUser, Server, Flash, Activity, Lock, Scale, ChevronDown} from "@nextui-org/shared-icons";
import {Dropdown, DropdownTrigger} from "@nextui-org/dropdown";

const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
};

export function CustomNavBar() {
    const [_, setIsMenuOpen] = useState(false);
    return (

        <Navbar  className={'bg-accent'}
                 shouldHideOnScroll={true}
                 onMenuOpenChange={setIsMenuOpen}
                 isBordered
                 maxWidth={'xl'}
        >
            <NavbarContent>
                <NavbarMenuToggle className={'sm:hidden'} />
                <NavbarBrand>
                    <Link href={'/'} className="font-bold text-inherit text-white">CUMEVENT</Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white text-md"
                                endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            >
                                Features
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="autoscaling"
                            description="ACME scales apps to meet user demand, automagically, based on load."
                            startContent={icons.scale}
                        >
                            Autoscaling
                        </DropdownItem>
                        <DropdownItem
                            key="usage_metrics"
                            description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                            startContent={icons.activity}
                        >
                            Usage Metrics
                        </DropdownItem>
                        <DropdownItem
                            key="production_ready"
                            description="ACME runs on ACME, join us and others serving requests at web scale."
                            startContent={icons.flash}
                        >
                            Production Ready
                        </DropdownItem>
                        <DropdownItem
                            key="99_uptime"
                            description="Applications stay on the grid with high availability and high uptime guarantees."
                            startContent={icons.server}
                        >
                            +99% Uptime
                        </DropdownItem>
                        <DropdownItem
                            key="supreme_support"
                            description="Overcome any challenge with a supporting team ready to respond."
                            startContent={icons.user}
                        >
                            +Supreme Support
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" className={'text-white'}>
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className={'text-white'}>
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem className="hidden lg:flex">
                    <Link href={"/signin"} className={'text-secondary'}>Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} className={'hover:text-white'} color="primary" href="/signup" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem >
                    <Link className={'text-accent text-xl'}>
                        Hmm
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}

