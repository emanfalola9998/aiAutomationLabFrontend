import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSortComment } from "@/store/features/counterSlice";

    export default function AppDropdown() {
    const dispatch = useDispatch();

    const handleSelectMode = (mode: "rating" | "latest" | "oldest") => {
        dispatch(setSortComment(mode));
    };

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="" asChild>
            <Button variant="custom" className="hover:bg-orange-200 mr-4 w-40 font-bold cursor-pointer ">Sort</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleSelectMode("rating")}>
                Highest Rated
                <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectMode("latest")}>
                Latest
                <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectMode("oldest")}>
                Oldest
                <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
        </DropdownMenuContent>
        </DropdownMenu>
    );
    }
