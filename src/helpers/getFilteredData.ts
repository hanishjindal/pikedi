import { User } from "@prisma/client";

const getFilteredData = (data: User) => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        image: data.image,
        role: data.role
    }
}

export default getFilteredData;