
const GetToken = (): string | null => {
    const tokenFound = window.localStorage.getItem(`sf_sibci_token`);
    return tokenFound ? tokenFound : null;
}

const SetToken = (token: string): string => {
    window.localStorage.setItem(`sf_sibci_token`, token);
    return token;
}

export { GetToken, SetToken };
