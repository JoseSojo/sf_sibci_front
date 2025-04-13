
export type RegexType = `email` | `letters` | `number` | `lettersMin3Max64` | `username` | `password`;

function ValidationRegex({ param, regex }: { param: string, regex: RegexType }) {
    switch (regex) {
        case `email`:
            return RegexEmail.test(param);
            break;
        case `letters`:
            return RegexLetters.test(param);
            break;
        case `lettersMin3Max64`:
            return RegexLettersMin3Max64.test(param);
            break;
        case `number`:
            return RegexNumber.test(param);
            break;
        case `username`:
            return RegexUsername.test(param);
            break;
        case `password`:
            return RegexPassword.test(param);
            break;

        default:
            break;
    }
}

const RegexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegexLetters = /^[a-zA-ZÀ-ÿ\s]{1,}$/;
const RegexNumber = /^[0-9]+$/;
const RegexLettersMin3Max64 = /^[a-zA-ZÀ-ÿ]{3,64}$/;
const RegexUsername = /^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{3,32}$/;
const RegexPassword = /^(?:(?=.*[a-z])?(?=.*[A-Z])?(?=.*\d)?(?=.*[-+*/._-])?.{3,64})$/;

export {
    RegexPassword,
    RegexEmail,
    RegexLetters,
    RegexNumber,
    RegexLettersMin3Max64,
    RegexUsername,
    ValidationRegex,
}
