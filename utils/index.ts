// generate random uuid 16 characters long with prefix
export const generateUUID= (prefix : string) => {
    return `${prefix}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`
}

export const randomUserAvatar = () => {
    const url = 'https://i.pravatar.cc/150?img='
    const random = Math.floor(Math.random() * 70) + 1;
    return url + random
}