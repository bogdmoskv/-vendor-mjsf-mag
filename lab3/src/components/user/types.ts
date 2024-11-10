import type {User} from "@/types";

export interface UserCardProps {
    item?: User;
}
export interface UserWrapperProps {
    items?: User[];
    loading?: boolean;
}
