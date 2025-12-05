import { createUserWithEmailAndPassword } from "firebase/auth";
import {collection, doc, setDoc, getDocs, addDoc, query, where, deleteDoc} from "firebase/firestore";
import { auth, db } from "./firebase.js";
import Student from './models/Student_Model.js';

/*
// ---------------- USERS TO UPLOAD ----------------
// user set 1
const users = [
    {
        firstName: "Adnan",
        lastName: "Abdullah",
        id: "S1001",
        email: "adnan@mail.com",
        password: "Pass1234",
        dateOfBirth: "21/11/2005",
        gender: "Male"
    },
    {
        firstName: "Aisha",
        lastName: "Khan",
        id: "S1002",
        email: "aisha@mail.com",
        password: "StrongPass1",
        dateOfBirth: "09/04/2004",
        gender: "Female"
    },
    {
        firstName: "Rahim",
        lastName: "Uddin",
        id: "S1003",
        email: "rahim@mail.com",
        password: "Rahim4321",
        dateOfBirth: "17/02/2003",
        gender: "Male"
    },
    {
        firstName: "Sara",
        lastName: "Islam",
        id: "S1004",
        email: "sara@mail.com",
        password: "Sara8811",
        dateOfBirth: "12/07/2006",
        gender: "Female"
    },
    {
        firstName: "Fahim",
        lastName: "Hasan",
        id: "S1005",
        email: "fahim@mail.com",
        password: "Fahim5566",
        dateOfBirth: "30/10/2005",
        gender: "Male"
    },
    {
        firstName: "Nusrat",
        lastName: "Jahan",
        id: "S1006",
        email: "nusrat@mail.com",
        password: "Nusrat9933",
        dateOfBirth: "05/12/2004",
        gender: "Female"
    },
    {
        firstName: "Omar",
        lastName: "Faruk",
        id: "S1007",
        email: "omar@mail.com",
        password: "Omar7410",
        dateOfBirth: "25/09/2003",
        gender: "Male"
    },
    {
        firstName: "Jannat",
        lastName: "Akter",
        id: "S1008",
        email: "jannat@mail.com",
        password: "Jannat3300",
        dateOfBirth: "14/08/2006",
        gender: "Female"
    },
    {
        firstName: "Mizan",
        lastName: "Chowdhury",
        id: "S1009",
        email: "mizan@mail.com",
        password: "Mizan2200",
        dateOfBirth: "20/03/2005",
        gender: "Male"
    },
    {
        firstName: "Ruba",
        lastName: "Sultana",
        id: "S1010",
        email: "ruba@mail.com",
        password: "Ruba1122",
        dateOfBirth: "11/01/2004",
        gender: "Female"
    },
];

// user set 2
const moreUsers = [
    { firstName: "Tanvir", lastName: "Hossain", id: "S1011", email: "tanvir@mail.com", password: "Tanvir9900", dateOfBirth: "03/02/2004", gender: "Male" },
    { firstName: "Mehnaz", lastName: "Karim", id: "S1012", email: "mehnaz@mail.com", password: "Mehnaz7788", dateOfBirth: "22/06/2005", gender: "Female" },
    { firstName: "Shafi", lastName: "Mahmud", id: "S1013", email: "shafi@mail.com", password: "Shafi6611", dateOfBirth: "15/09/2003", gender: "Male" },
    { firstName: "Nabila", lastName: "Rahman", id: "S1014", email: "nabila@mail.com", password: "Nabila2020", dateOfBirth: "27/03/2006", gender: "Female" },
    { firstName: "Imran", lastName: "Sarkar", id: "S1015", email: "imran@mail.com", password: "Imran5522", dateOfBirth: "19/08/2004", gender: "Male" },
    { firstName: "Tasnia", lastName: "Ahmed", id: "S1016", email: "tasnia@mail.com", password: "Tasnia0088", dateOfBirth: "11/11/2005", gender: "Female" },
    { firstName: "Farhan", lastName: "Khaled", id: "S1017", email: "farhan@mail.com", password: "Farhan7744", dateOfBirth: "08/01/2003", gender: "Male" },
    { firstName: "Shaila", lastName: "Yasmin", id: "S1018", email: "shaila@mail.com", password: "Shaila4455", dateOfBirth: "14/04/2006", gender: "Female" },
    { firstName: "Kawsar", lastName: "Ali", id: "S1019", email: "kawsar@mail.com", password: "Kawsar8899", dateOfBirth: "25/05/2005", gender: "Male" },
    { firstName: "Maliha", lastName: "Sabrina", id: "S1020", email: "maliha@mail.com", password: "Maliha9911", dateOfBirth: "05/12/2004", gender: "Female" },

    { firstName: "Rafid", lastName: "Rahman", id: "S1021", email: "rafid@mail.com", password: "Rafid6677", dateOfBirth: "10/02/2006", gender: "Male" },
    { firstName: "Sumaiya", lastName: "Akter", id: "S1022", email: "sumaiya@mail.com", password: "Sumaiya3388", dateOfBirth: "29/07/2003", gender: "Female" },
    { firstName: "Nahid", lastName: "Islam", id: "S1023", email: "nahid@mail.com", password: "Nahid1122", dateOfBirth: "07/10/2005", gender: "Male" },
    { firstName: "Fariha", lastName: "Nizam", id: "S1024", email: "fariha@mail.com", password: "Fariha4455", dateOfBirth: "18/01/2004", gender: "Female" },
    { firstName: "Ridwan", lastName: "Khan", id: "S1025", email: "ridwan@mail.com", password: "Ridwan2200", dateOfBirth: "21/05/2006", gender: "Male" },
    { firstName: "Samira", lastName: "Haque", id: "S1026", email: "samira@mail.com", password: "Samira1230", dateOfBirth: "03/03/2005", gender: "Female" },
    { firstName: "Arif", lastName: "Chowdhury", id: "S1027", email: "arif@mail.com", password: "Arif5566", dateOfBirth: "17/11/2003", gender: "Male" },
    { firstName: "Mim", lastName: "Sultana", id: "S1028", email: "mim@mail.com", password: "Mim8899", dateOfBirth: "26/08/2004", gender: "Female" },
    { firstName: "Shadman", lastName: "Sami", id: "S1029", email: "shadman@mail.com", password: "Shadman4312", dateOfBirth: "12/12/2006", gender: "Male" },
    { firstName: "Riyana", lastName: "Tasnim", id: "S1030", email: "riyana@mail.com", password: "Riyana5533", dateOfBirth: "06/09/2005", gender: "Female" },

    { firstName: "Tamim", lastName: "Iqbal", id: "S1031", email: "tamim@mail.com", password: "Tamim7788", dateOfBirth: "13/03/2004", gender: "Male" },
    { firstName: "Anika", lastName: "Ferdous", id: "S1032", email: "anika@mail.com", password: "Anika6677", dateOfBirth: "19/06/2003", gender: "Female" },
    { firstName: "Sami", lastName: "Mahin", id: "S1033", email: "sami@mail.com", password: "Sami4411", dateOfBirth: "22/01/2006", gender: "Male" },
    { firstName: "Mahira", lastName: "Nadia", id: "S1034", email: "mahira@mail.com", password: "Mahira3344", dateOfBirth: "28/04/2005", gender: "Female" },
    { firstName: "Naim", lastName: "Rahim", id: "S1035", email: "naim@mail.com", password: "Naim9911", dateOfBirth: "30/07/2004", gender: "Male" },
    { firstName: "Elma", lastName: "Sharmin", id: "S1036", email: "elma@mail.com", password: "Elma1100", dateOfBirth: "02/02/2003", gender: "Female" },
    { firstName: "Afnan", lastName: "Hossain", id: "S1037", email: "afnan@mail.com", password: "Afnan7788", dateOfBirth: "11/09/2006", gender: "Male" },
    { firstName: "Sadia", lastName: "Tawhida", id: "S1038", email: "sadia@mail.com", password: "Sadia5522", dateOfBirth: "09/10/2003", gender: "Female" },
    { firstName: "Zayed", lastName: "Faruqi", id: "S1039", email: "zayed@mail.com", password: "Zayed0033", dateOfBirth: "23/12/2005", gender: "Male" },
    { firstName: "Anamika", lastName: "Sowda", id: "S1040", email: "anamika@mail.com", password: "Anamika4455", dateOfBirth: "04/06/2004", gender: "Female" },

    { firstName: "Javed", lastName: "Rahman", id: "S1041", email: "javed@mail.com", password: "Javed9911", dateOfBirth: "07/04/2003", gender: "Male" },
    { firstName: "Mariya", lastName: "Anjum", id: "S1042", email: "mariya@mail.com", password: "Mariya8822", dateOfBirth: "01/01/2006", gender: "Female" },
    { firstName: "Osman", lastName: "Kader", id: "S1043", email: "osman@mail.com", password: "Osman5566", dateOfBirth: "19/11/2004", gender: "Male" },
    { firstName: "Shanjida", lastName: "Noor", id: "S1044", email: "shanjida@mail.com", password: "Shanjida2200", dateOfBirth: "15/05/2005", gender: "Female" },
    { firstName: "Rashid", lastName: "Mahmud", id: "S1045", email: "rashid@mail.com", password: "Rashid4488", dateOfBirth: "09/08/2003", gender: "Male" },
    { firstName: "Zarin", lastName: "Afsana", id: "S1046", email: "zarin@mail.com", password: "Zarin7788", dateOfBirth: "27/11/2006", gender: "Female" },
    { firstName: "Aalok", lastName: "Rahman", id: "S1047", email: "aalok@mail.com", password: "Aalok1100", dateOfBirth: "18/02/2004", gender: "Male" },
    { firstName: "Sumona", lastName: "Satter", id: "S1048", email: "sumona@mail.com", password: "Sumona3344", dateOfBirth: "06/10/2005", gender: "Female" },
    { firstName: "Rehan", lastName: "Bahadur", id: "S1049", email: "rehan@mail.com", password: "Rehan7711", dateOfBirth: "10/12/2004", gender: "Male" },
    { firstName: "Lubna", lastName: "Sheikh", id: "S1050", email: "lubna@mail.com", password: "Lubna9988", dateOfBirth: "22/03/2006", gender: "Female" },

    { firstName: "Tariq", lastName: "Anwar", id: "S1051", email: "tariq@mail.com", password: "Tariq6600", dateOfBirth: "14/09/2003", gender: "Male" },
    { firstName: "Fahmida", lastName: "Alam", id: "S1052", email: "fahmida@mail.com", password: "Fahmida5544", dateOfBirth: "26/01/2004", gender: "Female" },
    { firstName: "Ayaan", lastName: "Khan", id: "S1053", email: "ayaan@mail.com", password: "Ayaan4433", dateOfBirth: "03/07/2006", gender: "Male" },
    { firstName: "Sanjida", lastName: "Rahim", id: "S1054", email: "sanjida@mail.com", password: "Sanjida7700", dateOfBirth: "24/05/2005", gender: "Female" },
    { firstName: "Hassan", lastName: "Mirza", id: "S1055", email: "hassan@mail.com", password: "Hassan6655", dateOfBirth: "29/08/2004", gender: "Male" },
    { firstName: "Nashita", lastName: "Ahmed", id: "S1056", email: "nashita@mail.com", password: "Nashita3322", dateOfBirth: "04/12/2006", gender: "Female" },
    { firstName: "Rakib", lastName: "Shahriar", id: "S1057", email: "rakib@mail.com", password: "Rakib8899", dateOfBirth: "16/03/2003", gender: "Male" },
    { firstName: "Tasfiya", lastName: "Nihar", id: "S1058", email: "tasfiya@mail.com", password: "Tasfiya1111", dateOfBirth: "12/01/2005", gender: "Female" },
    { firstName: "Foysal", lastName: "Mahbub", id: "S1059", email: "foysal@mail.com", password: "Foysal7788", dateOfBirth: "07/10/2003", gender: "Male" },
    { firstName: "Nushrat", lastName: "Shila", id: "S1060", email: "nushrat@mail.com", password: "Nushrat4466", dateOfBirth: "30/06/2004", gender: "Female" }
];

const moreUsers2 = [
    { firstName: "Aariz", lastName: "Rahman", id: "S2001", email: "aariz2001@gmail.com", password: "Aariz1122", dateOfBirth: "11/02/2004", gender: "Male" },
    { firstName: "Maisha", lastName: "Tasnim", id: "S2002", email: "maisha2002@gmail.com", password: "Maisha3344", dateOfBirth: "23/06/2005", gender: "Female" },
    { firstName: "Zayan", lastName: "Karim", id: "S2003", email: "zayan2003@gmail.com", password: "Zayan7788", dateOfBirth: "14/08/2003", gender: "Male" },
    { firstName: "Tasmia", lastName: "Chowdhury", id: "S2004", email: "tasmia2004@gmail.com", password: "Tasmia5566", dateOfBirth: "09/01/2006", gender: "Female" },
    { firstName: "Ehsan", lastName: "Hossain", id: "S2005", email: "ehsan2005@gmail.com", password: "Ehsan9922", dateOfBirth: "07/04/2004", gender: "Male" },
    { firstName: "Rimsha", lastName: "Akter", id: "S2006", email: "rimsha2006@gmail.com", password: "Rimsha8800", dateOfBirth: "18/10/2005", gender: "Female" },
    { firstName: "Yamin", lastName: "Siddique", id: "S2007", email: "yamin2007@gmail.com", password: "Yamin6677", dateOfBirth: "02/12/2003", gender: "Male" },
    { firstName: "Inaya", lastName: "Haque", id: "S2008", email: "inaya2008@gmail.com", password: "Inaya4455", dateOfBirth: "16/06/2006", gender: "Female" },
    { firstName: "Sakib", lastName: "Ahmed", id: "S2009", email: "sakib2009@gmail.com", password: "Sakib7722", dateOfBirth: "27/03/2005", gender: "Male" },
    { firstName: "Nayla", lastName: "Islam", id: "S2010", email: "nayla2010@gmail.com", password: "Nayla1133", dateOfBirth: "05/09/2004", gender: "Female" },

    { firstName: "Fahad", lastName: "Kamal", id: "S2011", email: "fahad2011@gmail.com", password: "Fahad2211", dateOfBirth: "11/11/2003", gender: "Male" },
    { firstName: "Anannya", lastName: "Fariha", id: "S2012", email: "anannya2012@gmail.com", password: "Anannya9988", dateOfBirth: "29/02/2006", gender: "Female" },
    { firstName: "Rehan", lastName: "Sohail", id: "S2013", email: "rehan2013@gmail.com", password: "Rehan8811", dateOfBirth: "08/07/2004", gender: "Male" },
    { firstName: "Safia", lastName: "Afroza", id: "S2014", email: "safia2014@gmail.com", password: "Safia6622", dateOfBirth: "21/01/2005", gender: "Female" },
    { firstName: "Tameem", lastName: "Faruq", id: "S2015", email: "tameem2015@gmail.com", password: "Tameem5599", dateOfBirth: "09/05/2003", gender: "Male" },
    { firstName: "Liyana", lastName: "Sultana", id: "S2016", email: "liyana2016@gmail.com", password: "Liyana7744", dateOfBirth: "13/03/2006", gender: "Female" },
    { firstName: "Rakin", lastName: "Mahmud", id: "S2017", email: "rakin2017@gmail.com", password: "Rakin3344", dateOfBirth: "17/10/2004", gender: "Male" },
    { firstName: "Zohara", lastName: "Nusrat", id: "S2018", email: "zohara2018@gmail.com", password: "Zohara8833", dateOfBirth: "28/12/2005", gender: "Female" },
    { firstName: "Bashir", lastName: "Ullah", id: "S2019", email: "bashir2019@gmail.com", password: "Bashir6677", dateOfBirth: "19/02/2003", gender: "Male" },
    { firstName: "Ela", lastName: "Afsana", id: "S2020", email: "ela2020@gmail.com", password: "Ela4400", dateOfBirth: "03/08/2006", gender: "Female" },

    { firstName: "Murad", lastName: "Hassan", id: "S2021", email: "murad2021@gmail.com", password: "Murad5511", dateOfBirth: "25/01/2004", gender: "Male" },
    { firstName: "Sadia", lastName: "Mouri", id: "S2022", email: "sadia2022@gmail.com", password: "Sadia7722", dateOfBirth: "11/04/2005", gender: "Female" },
    { firstName: "Afnan", lastName: "Sharif", id: "S2023", email: "afnan2023@gmail.com", password: "Afnan8866", dateOfBirth: "09/09/2003", gender: "Male" },
    { firstName: "Mahira", lastName: "Jannat", id: "S2024", email: "mahira2024@gmail.com", password: "Mahira5533", dateOfBirth: "31/05/2006", gender: "Female" },
    { firstName: "Yusuf", lastName: "Kabir", id: "S2025", email: "yusuf2025@gmail.com", password: "Yusuf1188", dateOfBirth: "15/12/2004", gender: "Male" },
    { firstName: "Nohora", lastName: "Akter", id: "S2026", email: "nohora2026@gmail.com", password: "Nohora9009", dateOfBirth: "04/03/2005", gender: "Female" },
    { firstName: "Rashid", lastName: "Hassan", id: "S2027", email: "rashid2027@gmail.com", password: "Rashid6611", dateOfBirth: "06/07/2003", gender: "Male" },
    { firstName: "Zareen", lastName: "Mohi", id: "S2028", email: "zareen2028@gmail.com", password: "Zareen4477", dateOfBirth: "20/10/2006", gender: "Female" },
    { firstName: "Tabrez", lastName: "Hossain", id: "S2029", email: "tabrez2029@gmail.com", password: "Tabrez7744", dateOfBirth: "10/01/2004", gender: "Male" },
    { firstName: "Nayema", lastName: "Sadia", id: "S2030", email: "nayema2030@gmail.com", password: "Nayema8855", dateOfBirth: "23/09/2005", gender: "Female" },

    { firstName: "Ikram", lastName: "Hasib", id: "S2031", email: "ikram2031@gmail.com", password: "Ikram2200", dateOfBirth: "16/11/2003", gender: "Male" },
    { firstName: "Tuba", lastName: "Noor", id: "S2032", email: "tuba2032@gmail.com", password: "Tuba6655", dateOfBirth: "27/06/2006", gender: "Female" },
    { firstName: "Nadeem", lastName: "Fahim", id: "S2033", email: "nadeem2033@gmail.com", password: "Nadeem4488", dateOfBirth: "04/04/2005", gender: "Male" },
    { firstName: "Mariyam", lastName: "Rahima", id: "S2034", email: "mariyam2034@gmail.com", password: "Mariyam7788", dateOfBirth: "14/12/2004", gender: "Female" },
    { firstName: "Arafat", lastName: "Mahin", id: "S2035", email: "arafat2035@gmail.com", password: "Arafat5500", dateOfBirth: "21/08/2003", gender: "Male" },
    { firstName: "Tazkia", lastName: "Hossain", id: "S2036", email: "tazkia2036@gmail.com", password: "Tazkia9911", dateOfBirth: "06/03/2006", gender: "Female" },
    { firstName: "Noman", lastName: "Ishraq", id: "S2037", email: "noman2037@gmail.com", password: "Noman3388", dateOfBirth: "08/07/2004", gender: "Male" },
    { firstName: "Afsana", lastName: "Mim", id: "S2038", email: "afsana2038@gmail.com", password: "Afsana5522", dateOfBirth: "17/10/2005", gender: "Female" },
    { firstName: "Hasin", lastName: "Kamal", id: "S2039", email: "hasin2039@gmail.com", password: "Hasin4411", dateOfBirth: "05/02/2003", gender: "Male" },
    { firstName: "Zinia", lastName: "Parvin", id: "S2040", email: "zinia2040@gmail.com", password: "Zinia7733", dateOfBirth: "28/05/2006", gender: "Female" },

    { firstName: "Ahamed", lastName: "Sabbir", id: "S2041", email: "ahamed2041@gmail.com", password: "Ahamed6622", dateOfBirth: "15/09/2004", gender: "Male" },
    { firstName: "Jhumu", lastName: "Akter", id: "S2042", email: "jhumu2042@gmail.com", password: "Jhumu3377", dateOfBirth: "19/01/2005", gender: "Female" },
    { firstName: "Mehedi", lastName: "Hasan", id: "S2043", email: "mehedi2043@gmail.com", password: "Mehedi8899", dateOfBirth: "07/04/2003", gender: "Male" },
    { firstName: "Afsara", lastName: "Tanzim", id: "S2044", email: "afsara2044@gmail.com", password: "Afsara9955", dateOfBirth: "30/10/2006", gender: "Female" },
    { firstName: "Shahbaz", lastName: "Rafi", id: "S2045", email: "shahbaz2045@gmail.com", password: "Shahbaz6600", dateOfBirth: "12/02/2004", gender: "Male" },
    { firstName: "Khadija", lastName: "Samiha", id: "S2046", email: "khadija2046@gmail.com", password: "Khadija8822", dateOfBirth: "09/06/2005", gender: "Female" },
    { firstName: "Zakaria", lastName: "Shafiq", id: "S2047", email: "zakaria2047@gmail.com", password: "Zakaria7744", dateOfBirth: "01/07/2003", gender: "Male" },
    { firstName: "Rania", lastName: "Hossain", id: "S2048", email: "rania2048@gmail.com", password: "Rania2211", dateOfBirth: "04/05/2006", gender: "Female" },
    { firstName: "Ishfaq", lastName: "Ismail", id: "S2049", email: "ishfaq2049@gmail.com", password: "Ishfaq1133", dateOfBirth: "20/11/2004", gender: "Male" },
    { firstName: "Nazifa", lastName: "Rizwaan", id: "S2050", email: "nazifa2050@gmail.com", password: "Nazifa4488", dateOfBirth: "18/08/2005", gender: "Female" }
];

// ---------------- SIGN UP FUNCTION ----------------
const SignIn = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {
            success: true,
            user: userCredential.user,
            uid: userCredential.user.uid
        };

    } catch (error) {
        console.error("Auth Error:", error);
        return { success: false, error };
    }
};


// ---------------- STORE INFORMATION IN FIRESTORE ----------------
const storeInformation = async (uid, user) => {
    try {
        const ref = doc(db, 'Students', uid);

        await setDoc(ref, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            studentId: user.id,
            image: "",
            dob: user.dateOfBirth ? new Date(user.dateOfBirth.split("/").reverse().join("-")) : null,
            createdAt: new Date()
        });

        return { success: true };

    } catch (error) {
        console.error("Firestore Error:", error);
        return { success: false, error };
    }
};


// ---------------- MAIN FUNCTION TO UPLOAD ALL USERS ----------------
//
const uploadAllUsers = async () => {
    console.log("Starting upload...");

    for (const user of moreUsers2) {
        console.log(`Creating user: ${user.email}`);

        const authResult = await SignIn(user.email, user.password);

        if (!authResult.success) {
            console.log(`Failed to create: ${user.email}`);
            continue;
        }

        const uid = authResult.uid;

        const firestoreResult = await storeInformation(uid, user);

        if (firestoreResult.success) {
            console.log(`✔ Uploaded: ${user.firstName} ${user.lastName}`);
        } else {
            console.log(`❌ Firestore failed for: ${user.email}`);
        }
    }

    console.log("All uploads finished.");
};




uploadAllUsers().then(() => {
    console.log('All uploads finished.');
} );

 */

/*// --------------------- Question Upload --------------------------
const questions = [
    // ==========================================
    // PART 1: USER PROVIDED QUESTIONS (1-41)
    // ==========================================
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reverse an Array",
        description: "Given an array of integers, reverse the array without using built-in reverse methods.\n\nInput: [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find Maximum Element in Array",
        description: "Given an array of integers, find the maximum element.\n\nInput: [1,9,2,7]\nOutput: 9",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Move Zeroes to End",
        description: "Move all zeros in an array to the end while maintaining the relative order of non-zero elements.\n\nInput: [0,1,0,3,12]\nOutput: [1,3,12,0,0]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Two Sum Problem",
        description: "Return indices of two numbers that add up to the target.\n\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Subarray Sum Equals K",
        description: "Return the total number of continuous subarrays whose sum equals k.\n\nInput: [1,1,1], k = 2\nOutput: 2",
        difficulty: "hard",
        type: "Array",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find Minimum in Rotated Sorted Array",
        description: "Given a rotated sorted array, find the minimum element.\n\nInput: [3,4,5,1,2]\nOutput: 1",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Product of Array Except Self",
        description: "Return an array where each element is the product of all others except itself.\n\nInput: [1,2,3,4]\nOutput: [24,12,8,6]",
        difficulty: "hard",
        type: "Array",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Merge Sorted Arrays",
        description: "Merge two sorted arrays into a single sorted array.\n\nInput: [1,3,5], [2,4,6]\nOutput: [1,2,3,4,5,6]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find Pivot Index",
        description: "Find the pivot index where sum of left elements equals sum of right elements.\n\nInput: [1,7,3,6,5,6]\nOutput: 3",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Remove Duplicates from Sorted Array",
        description: "Remove duplicates in-place and return new length.\n\nInput: [0,0,1,1,2]\nOutput: 3, Array: [0,1,2]",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Common Subsequence",
        description: "Find the length of the longest common subsequence between two strings.\n\nInput: 'ABCDGH','AEDFHR'\nOutput: 3",
        difficulty: "easy",
        type: "String",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Valid Palindrome",
        description: "Check if a string reads the same forwards and backwards, ignoring non-alphanumeric.\n\nInput: 'A man, a plan, a canal: Panama'\nOutput: true",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Palindromic Substring",
        description: "Find the longest palindromic substring in a given string.\n\nInput: 'babad'\nOutput: 'bab' or 'aba'",
        difficulty: "medium",
        type: "String",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Group Anagrams",
        description: "Group strings that are anagrams together.\n\nInput: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],['tan','nat'],['bat']]",
        difficulty: "medium",
        type: "String",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Implement strStr()",
        description: "Return the index of the first occurrence of needle in haystack, or -1 if not found.\n\nInput: 'hello','ll'\nOutput: 2",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Repeating Character Replacement",
        description: "Given a string and k, find length of longest substring after replacing at most k characters.\n\nInput: 'AABABBA', k = 1\nOutput: 4",
        difficulty: "medium",
        type: "String",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Valid Anagram",
        description: "Check if two strings are anagrams of each other.\n\nInput: 'anagram','nagaram'\nOutput: true",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Fizz Buzz",
        description: "Print numbers 1 to n, replace multiples of 3 with 'Fizz', 5 with 'Buzz', both with 'FizzBuzz'.\n\nInput: 15\nOutput: ['1','2','Fizz','4','Buzz',...,'FizzBuzz']",
        difficulty: "easy",
        type: "Integer",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Integer to Roman",
        description: "Convert integer to Roman numeral.\n\nInput: 58\nOutput: 'LVIII'",
        difficulty: "medium",
        type: "Integer",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Roman to Integer",
        description: "Convert Roman numeral to integer.\n\nInput: 'MCMXCIV'\nOutput: 1994",
        difficulty: "medium",
        type: "Integer",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Power of Two",
        description: "Check if an integer is a power of two.\n\nInput: 16\nOutput: true",
        difficulty: "easy",
        type: "Integer",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Pow(x,n)",
        description: "Implement pow(x,n), i.e., calculate x raised to power n.\n\nInput: x=2, n=10\nOutput: 1024",
        difficulty: "medium",
        type: "Integer",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Valid Parentheses",
        description: "Check if the input string of brackets is valid.\n\nInput: '()[]{}'\nOutput: true",
        difficulty: "easy",
        type: "Boolean",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Evaluate Reverse Polish Notation",
        description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation.\n\nInput: ['2','1','+','3','*']\nOutput: 9",
        difficulty: "medium",
        type: "Boolean",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Min Stack",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nInput: push(1), push(2), getMin()\nOutput: 1",
        difficulty: "medium",
        type: "Stack",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Implement Queue using Stacks",
        description: "Implement a queue using two stacks.\n\nInput: push(1), push(2), pop()\nOutput: 1",
        difficulty: "medium",
        type: "Queue",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Maximum Depth of Binary Tree",
        description: "Find the maximum depth of a binary tree.\n\nInput: [3,9,20,null,null,15,7]\nOutput: 3",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Symmetric Tree",
        description: "Check if a binary tree is symmetric.\n\nInput: [1,2,2,3,4,4,3]\nOutput: true",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Binary Tree Level Order Traversal",
        description: "Return the level order traversal of a binary tree.\n\nInput: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Validate BST",
        description: "Check if a binary tree is a valid binary search tree.\n\nInput: [2,1,3]\nOutput: true",
        difficulty: "medium",
        type: "BST",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Lowest Common Ancestor of BST",
        description: "Find the lowest common ancestor of two nodes in a BST.\n\nInput: [6,2,8,0,4,7,9,null,null,3,5], p=2, q=8\nOutput: 6",
        difficulty: "medium",
        type: "BST",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Number of Islands",
        description: "Given a 2D grid, count the number of islands.\n\nInput: [[1,1,0],[0,1,0],[0,0,1]]\nOutput: 2",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Clone Graph",
        description: "Clone an undirected graph.\n\nInput: Node reference\nOutput: Cloned graph",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Course Schedule",
        description: "Determine if you can finish all courses given prerequisites.\n\nInput: numCourses=2, prerequisites=[[1,0]]\nOutput: true",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Increasing Subsequence",
        description: "Find the length of the longest increasing subsequence.\n\nInput: [10,9,2,5,3,7,101,18]\nOutput: 4",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Coin Change",
        description: "Given coins of different denominations and an amount, find the fewest coins needed.\n\nInput: coins=[1,2,5], amount=11\nOutput: 3",
        difficulty: "hard",
        type: "DP",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Climbing Stairs",
        description: "Count distinct ways to climb n stairs.\n\nInput: 5\nOutput: 8",
        difficulty: "easy",
        type: "DP",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Word Break",
        description: "Determine if string can be segmented into a space-separated sequence of dictionary words.\n\nInput: s='leetcode', wordDict=['leet','code']\nOutput: true",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Decode Ways",
        description: "Count the number of ways to decode a numeric string.\n\nInput: '226'\nOutput: 3",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Maximum Subarray",
        description: "Find the contiguous subarray with the largest sum.\n\nInput: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6",
        difficulty: "easy",
        type: "DP",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "House Robber",
        description: "Find the maximum amount of money you can rob without alerting the police.\n\nInput: [1,2,3,1]\nOutput: 4",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },

    // ==========================================
    // PART 2: ADDITIONAL GENERATED QUESTIONS (42-200)
    // ==========================================

    // ----- Linked List -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reverse Linked List",
        description: "Reverse a singly linked list.\n\nInput: 1->2->3->4->5->NULL\nOutput: 5->4->3->2->1->NULL",
        difficulty: "easy",
        type: "Linked List",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists and return it as a new sorted list.\n\nInput: 1->2->4, 1->3->4\nOutput: 1->1->2->3->4->4",
        difficulty: "easy",
        type: "Linked List",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Linked List Cycle",
        description: "Determine if a linked list has a cycle in it.\n\nInput: head = [3,2,0,-4], pos = 1\nOutput: true",
        difficulty: "easy",
        type: "Linked List",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Remove Nth Node From End of List",
        description: "Remove the nth node from the end of the list and return its head.\n\nInput: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Palindrome Linked List",
        description: "Given a singly linked list, determine if it is a palindrome.\n\nInput: 1->2->2->1\nOutput: true",
        difficulty: "easy",
        type: "Linked List",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Intersection of Two Linked Lists",
        description: "Find the node at which the intersection of two singly linked lists begins.\n\nInput: intersectVal = 8\nOutput: Reference of the node with value = 8",
        difficulty: "easy",
        type: "Linked List",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Add Two Numbers",
        description: "Add two numbers represented by linked lists.\n\nInput: (2 -> 4 -> 3) + (5 -> 6 -> 4)\nOutput: 7 -> 0 -> 8",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Rotate List",
        description: "Given a linked list, rotate the list to the right by k places.\n\nInput: 1->2->3->4->5->NULL, k = 2\nOutput: 4->5->1->2->3->NULL",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Swap Nodes in Pairs",
        description: "Swap every two adjacent nodes and return its head.\n\nInput: [1,2,3,4]\nOutput: [2,1,4,3]",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Linked List Cycle II",
        description: "Given a linked list, return the node where the cycle begins.\n\nInput: head = [3,2,0,-4], pos = 1\nOutput: node index 1",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reverse Nodes in k-Group",
        description: "Reverse the nodes of a linked list k at a time.\n\nInput: [1,2,3,4,5], k=2\nOutput: [2,1,4,3,5]",
        difficulty: "hard",
        type: "Linked List",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Merge k Sorted Lists",
        description: "Merge k sorted linked lists and return it as one sorted list.\n\nInput: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        difficulty: "hard",
        type: "Linked List",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Sort List",
        description: "Sort a linked list in O(n log n) time using constant space complexity.\n\nInput: [4,2,1,3]\nOutput: [1,2,3,4]",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reorder List",
        description: "Reorder list to L0 -> Ln -> L1 -> Ln-1...\n\nInput: [1,2,3,4]\nOutput: [1,4,2,3]",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Copy List with Random Pointer",
        description: "Deep copy a linked list where each node has a random pointer.\n\nInput: [[7,null],[13,0],[11,4]]\nOutput: Deep Copy",
        difficulty: "medium",
        type: "Linked List",
        mark: 10,
        event_uid: ""
    },

    // ----- More Arrays & Hashing -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Contains Duplicate",
        description: "Return true if any value appears at least twice in the array.\n\nInput: [1,2,3,1]\nOutput: true",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Best Time to Buy and Sell Stock",
        description: "Maximize profit by choosing a single day to buy and a different day to sell.\n\nInput: [7,1,5,3,6,4]\nOutput: 5",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Best Time to Buy and Sell Stock II",
        description: "Maximize profit with multiple transactions allowed.\n\nInput: [7,1,5,3,6,4]\nOutput: 7",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Container With Most Water",
        description: "Find two lines that together with the x-axis form a container that holds the most water.\n\nInput: [1,8,6,2,5,4,8,3,7]\nOutput: 49",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "3Sum",
        description: "Find all unique triplets in the array which gives the sum of zero.\n\nInput: [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Top K Frequent Elements",
        description: "Return the k most frequent elements.\n\nInput: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Consecutive Sequence",
        description: "Find length of the longest consecutive elements sequence in O(n).\n\nInput: [100,4,200,1,3,2]\nOutput: 4",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Rotate Array",
        description: "Rotate the array to the right by k steps.\n\nInput: [1,2,3,4,5,6,7], k=3\nOutput: [5,6,7,1,2,3,4]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "First Missing Positive",
        description: "Find the smallest missing positive integer.\n\nInput: [1,2,0]\nOutput: 3",
        difficulty: "hard",
        type: "Array",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Spiral Matrix",
        description: "Return all elements of the matrix in spiral order.\n\nInput: [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Set Matrix Zeroes",
        description: "If an element is 0, set its entire row and column to 0.\n\nInput: [[1,1,1],[1,0,1],[1,1,1]]\nOutput: [[1,0,1],[0,0,0],[1,0,1]]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Search a 2D Matrix",
        description: "Search for a value in an m x n matrix where rows are sorted.\n\nInput: matrix = [[1,3]], target = 3\nOutput: true",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Rotate Image",
        description: "Rotate the image (n x n 2D matrix) by 90 degrees (clockwise).\n\nInput: [[1,2],[3,4]]\nOutput: [[3,1],[4,2]]",
        difficulty: "medium",
        type: "Array",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Trapping Rain Water",
        description: "Compute how much water it can trap after raining.\n\nInput: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
        difficulty: "hard",
        type: "Array",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Sliding Window Maximum",
        description: "Return the max sliding window.\n\nInput: [1,3,-1,-3,5,3,6,7], k=3\nOutput: [3,3,5,5,6,7]",
        difficulty: "hard",
        type: "Array",
        mark: 15,
        event_uid: ""
    },

    // ----- More Trees & BST -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Invert Binary Tree",
        description: "Invert a binary tree.\n\nInput: [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Diameter of Binary Tree",
        description: "Compute the length of the diameter of the tree.\n\nInput: [1,2,3,4,5]\nOutput: 3",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Balanced Binary Tree",
        description: "Determine if a binary tree is height-balanced.\n\nInput: [3,9,20,null,null,15,7]\nOutput: true",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Same Tree",
        description: "Check if two binary trees are exactly the same.\n\nInput: p=[1,2,3], q=[1,2,3]\nOutput: true",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Subtree of Another Tree",
        description: "Check if tree t is a subtree of tree s.\n\nInput: s=[3,4,5,1,2], t=[4,1,2]\nOutput: true",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Kth Smallest Element in a BST",
        description: "Find the kth smallest element in a BST.\n\nInput: [3,1,4,null,2], k=1\nOutput: 1",
        difficulty: "medium",
        type: "BST",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        description: "Construct binary tree from preorder and inorder traversal arrays.\n\nInput: preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Path Sum",
        description: "Determine if the tree has a root-to-leaf path adding up to targetSum.\n\nInput: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum=22\nOutput: true",
        difficulty: "easy",
        type: "Binary Tree",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Path Sum II",
        description: "Find all root-to-leaf paths where each path's sum equals targetSum.\n\nInput: root, targetSum=22\nOutput: [[5,4,11,2],[5,8,4,5]]",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Path Sum III",
        description: "Find the number of paths that sum to a given value.\n\nInput: root, sum=8\nOutput: 3",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Binary Tree Maximum Path Sum",
        description: "Find the maximum path sum in a binary tree.\n\nInput: [1,2,3]\nOutput: 6",
        difficulty: "hard",
        type: "Binary Tree",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Serialize and Deserialize Binary Tree",
        description: "Design an algorithm to serialize and deserialize a binary tree.\n\nInput: [1,2,3,null,null,4,5]\nOutput: [1,2,3,null,null,4,5]",
        difficulty: "hard",
        type: "Binary Tree",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Binary Tree Right Side View",
        description: "Return the values of the nodes you can see ordered from top to bottom.\n\nInput: [1,2,3,null,5,null,4]\nOutput: [1,3,4]",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Count Good Nodes in Binary Tree",
        description: "Count nodes in the tree where path from root to X has no nodes greater than X.\n\nInput: [3,1,4,3,null,1,5]\nOutput: 4",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Flatten Binary Tree to Linked List",
        description: "Flatten the tree into a linked list in-place.\n\nInput: [1,2,5,3,4,null,6]\nOutput: [1,null,2,null,3,null,4,null,5,null,6]",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },

    // ----- Backtracking -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Permutations",
        description: "Return all possible permutations.\n\nInput: [1,2,3]\nOutput: [[1,2,3],[1,3,2],...]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Subsets",
        description: "Return all possible subsets (the power set).\n\nInput: [1,2,3]\nOutput: [[],[1],[2],[1,2],...]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Combination Sum",
        description: "Find all unique combinations where numbers sum to target.\n\nInput: [2,3,6,7], target=7\nOutput: [[2,2,3],[7]]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Combination Sum II",
        description: "Find all unique combinations summing to target using each number once.\n\nInput: [10,1,2,7,6,1,5], target=8\nOutput: [[1,1,6],[1,2,5],...]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Word Search",
        description: "Check if the word exists in the grid.\n\nInput: board, word='ABCCED'\nOutput: true",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Letter Combinations of a Phone Number",
        description: "Return all possible letter combinations that the number could represent.\n\nInput: '23'\nOutput: ['ad','ae','af','bd',...]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "N-Queens",
        description: "Place n queens on an n×n chessboard such that no two queens attack each other.\n\nInput: n=4\nOutput: [[...],[...]]",
        difficulty: "hard",
        type: "Backtracking",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Palindrome Partitioning",
        description: "Partition s such that every substring is a palindrome.\n\nInput: 'aab'\nOutput: [['a','a','b'],['aa','b']]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Sudoku Solver",
        description: "Write a program to solve a Sudoku puzzle by filling the empty cells.\n\nInput: board\nOutput: solved board",
        difficulty: "hard",
        type: "Backtracking",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Generate Parentheses",
        description: "Generate all combinations of well-formed parentheses.\n\nInput: n=3\nOutput: ['((()))','(()())',...]",
        difficulty: "medium",
        type: "Backtracking",
        mark: 10,
        event_uid: ""
    },

    // ----- More Dynamic Programming -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Unique Paths",
        description: "Find the number of unique paths from top-left to bottom-right.\n\nInput: m=3, n=7\nOutput: 28",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Unique Paths II",
        description: "Find number of paths with obstacles.\n\nInput: [[0,0,0],[0,1,0],[0,0,0]]\nOutput: 2",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Minimum Path Sum",
        description: "Find the path with minimum sum.\n\nInput: [[1,3,1],[1,5,1],[4,2,1]]\nOutput: 7",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Palindromic Subsequence",
        description: "Find the length of the longest palindromic subsequence.\n\nInput: 'bbbab'\nOutput: 4",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Partition Equal Subset Sum",
        description: "Determine if the array can be partitioned into two subsets with equal sum.\n\nInput: [1,5,11,5]\nOutput: true",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Target Sum",
        description: "Find number of ways to assign +/- to reach target.\n\nInput: [1,1,1,1,1], target=3\nOutput: 5",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Min Cost Climbing Stairs",
        description: "Find minimum cost to reach the top of the floor.\n\nInput: [10,15,20]\nOutput: 15",
        difficulty: "easy",
        type: "DP",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Edit Distance",
        description: "Find minimum operations to convert word1 to word2.\n\nInput: word1='horse', word2='ros'\nOutput: 3",
        difficulty: "hard",
        type: "DP",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Burst Balloons",
        description: "Maximize coins by bursting balloons.\n\nInput: [3,1,5,8]\nOutput: 167",
        difficulty: "hard",
        type: "DP",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "House Robber II",
        description: "House Robber where houses are arranged in a circle.\n\nInput: [2,3,2]\nOutput: 3",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Maximal Square",
        description: "Find the largest square containing only 1s and return its area.\n\nInput: matrix\nOutput: 4",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Interleaving String",
        description: "Determine if s3 is formed by interleaving s1 and s2.\n\nInput: s1='aabcc', s2='dbbca', s3='aadbbcbcac'\nOutput: true",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Triangle",
        description: "Find the minimum path sum from top to bottom.\n\nInput: [[2],[3,4],[6,5,7],[4,1,8,3]]\nOutput: 11",
        difficulty: "medium",
        type: "DP",
        mark: 10,
        event_uid: ""
    },

    // ----- More Graph & Union Find -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Max Area of Island",
        description: "Find the maximum area of an island in the 2D grid.\n\nInput: grid\nOutput: 6",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Pacific Atlantic Water Flow",
        description: "Find cells where water can flow to both Pacific and Atlantic oceans.\n\nInput: heights\nOutput: [[0,4],[1,3],...]",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Surrounded Regions",
        description: "Capture all regions surrounded by 'X'.\n\nInput: board\nOutput: Modified board",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Rotting Oranges",
        description: "Return the minimum number of minutes until no fresh orange remains.\n\nInput: grid\nOutput: 4",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Course Schedule II",
        description: "Return the ordering of courses to finish all courses.\n\nInput: 2, [[1,0]]\nOutput: [0,1]",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Redundant Connection",
        description: "Return an edge that can be removed so that the resulting graph is a tree.\n\nInput: [[1,2],[1,3],[2,3]]\nOutput: [2,3]",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Number of Connected Components in an Undirected Graph",
        description: "Find the number of connected components.\n\nInput: n=5, edges=[[0,1],[1,2],[3,4]]\nOutput: 2",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Word Ladder",
        description: "Find the number of words in the shortest transformation sequence.\n\nInput: beginWord, endWord, wordList\nOutput: 5",
        difficulty: "hard",
        type: "Graph",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Network Delay Time",
        description: "Find the time it takes for all nodes to receive the signal.\n\nInput: times, n, k\nOutput: 2",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Cheapest Flights Within K Stops",
        description: "Find the cheapest price from src to dst with at most k stops.\n\nInput: n, flights, src, dst, k\nOutput: 200",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Alien Dictionary",
        description: "Derive the order of letters in an alien language.\n\nInput: words\nOutput: 'wertf'",
        difficulty: "hard",
        type: "Graph",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Graph Valid Tree",
        description: "Check if the edges make a valid tree.\n\nInput: n=5, edges=[[0,1],[0,2],[0,3],[1,4]]\nOutput: true",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },

    // ----- Heap / Priority Queue -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Kth Largest Element in an Array",
        description: "Find the kth largest element in an unsorted array.\n\nInput: [3,2,1,5,6,4], k=2\nOutput: 5",
        difficulty: "medium",
        type: "Heap",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "K Closest Points to Origin",
        description: "Find K closest points to the origin (0,0).\n\nInput: points=[[1,3],[-2,2]], K=1\nOutput: [[-2,2]]",
        difficulty: "medium",
        type: "Heap",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Task Scheduler",
        description: "Find the least number of units of time to finish all tasks.\n\nInput: tasks=['A','A','A','B','B','B'], n=2\nOutput: 8",
        difficulty: "medium",
        type: "Heap",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find Median from Data Stream",
        description: "Design a data structure that supports adding integers and finding the median.\n\nInput: add(1), add(2), findMedian()\nOutput: 1.5",
        difficulty: "hard",
        type: "Heap",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Merge K Sorted Lists",
        description: "Merge k sorted linked lists and return it as one sorted list.\n\nInput: lists\nOutput: sorted list",
        difficulty: "hard",
        type: "Heap",
        mark: 15,
        event_uid: ""
    },

    // ----- Greedy -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Jump Game",
        description: "Determine if you can reach the last index.\n\nInput: [2,3,1,1,4]\nOutput: true",
        difficulty: "medium",
        type: "Greedy",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Jump Game II",
        description: "Find minimum number of jumps to reach the last index.\n\nInput: [2,3,1,1,4]\nOutput: 2",
        difficulty: "medium",
        type: "Greedy",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Gas Station",
        description: "Return the starting gas station's index if you can travel around the circuit once.\n\nInput: gas=[1,2,3,4,5], cost=[3,4,5,1,2]\nOutput: 3",
        difficulty: "medium",
        type: "Greedy",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Partition Labels",
        description: "Partition string into as many parts as possible such that each letter appears in at most one part.\n\nInput: 'ababcbacadefegdehijhklij'\nOutput: [9,7,8]",
        difficulty: "medium",
        type: "Greedy",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Valid Parenthesis String",
        description: "Check validity considering '*' as '(', ')', or empty.\n\nInput: '(*))'\nOutput: true",
        difficulty: "medium",
        type: "Greedy",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Candy",
        description: "Find minimum candies needed.\n\nInput: [1,0,2]\nOutput: 5",
        difficulty: "hard",
        type: "Greedy",
        mark: 15,
        event_uid: ""
    },

    // ----- Bit Manipulation -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Single Number",
        description: "Find the element that appears only once.\n\nInput: [4,1,2,1,2]\nOutput: 4",
        difficulty: "easy",
        type: "Bit Manipulation",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Number of 1 Bits",
        description: "Write a function that takes an unsigned integer and returns the number of '1' bits.\n\nInput: 11 (binary 1011)\nOutput: 3",
        difficulty: "easy",
        type: "Bit Manipulation",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Counting Bits",
        description: "Return an array of number of 1 bits for 0 to n.\n\nInput: 2\nOutput: [0,1,1]",
        difficulty: "easy",
        type: "Bit Manipulation",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Missing Number",
        description: "Find the missing number in the range [0, n].\n\nInput: [3,0,1]\nOutput: 2",
        difficulty: "easy",
        type: "Bit Manipulation",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reverse Bits",
        description: "Reverse bits of a given 32 bits unsigned integer.\n\nInput: 43261596\nOutput: 964176192",
        difficulty: "easy",
        type: "Bit Manipulation",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Sum of Two Integers",
        description: "Calculate the sum of two integers without using + and -.\n\nInput: a=1, b=2\nOutput: 3",
        difficulty: "medium",
        type: "Bit Manipulation",
        mark: 10,
        event_uid: ""
    },

    // ----- Trie -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Implement Trie (Prefix Tree)",
        description: "Implement a trie with insert, search, and startsWith methods.\n\nInput: insert('apple'), search('apple')\nOutput: true",
        difficulty: "medium",
        type: "Trie",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Design Add and Search Words Data Structure",
        description: "Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\nInput: addWord('bad'), search('.ad')\nOutput: true",
        difficulty: "medium",
        type: "Trie",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Word Search II",
        description: "Find all words in the board.\n\nInput: board, words\nOutput: ['oath','eat']",
        difficulty: "hard",
        type: "Trie",
        mark: 15,
        event_uid: ""
    },

    // ----- Intervals -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Insert Interval",
        description: "Insert a new interval into a sorted list of non-overlapping intervals.\n\nInput: [[1,3],[6,9]], [2,5]\nOutput: [[1,5],[6,9]]",
        difficulty: "medium",
        type: "Intervals",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Merge Intervals",
        description: "Merge all overlapping intervals.\n\nInput: [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
        difficulty: "medium",
        type: "Intervals",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Non-overlapping Intervals",
        description: "Find minimum number of intervals to remove to make the rest non-overlapping.\n\nInput: [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1",
        difficulty: "medium",
        type: "Intervals",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Meeting Rooms",
        description: "Determine if a person could attend all meetings.\n\nInput: [[0,30],[5,10],[15,20]]\nOutput: false",
        difficulty: "easy",
        type: "Intervals",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Meeting Rooms II",
        description: "Find the minimum number of conference rooms required.\n\nInput: [[0,30],[5,10],[15,20]]\nOutput: 2",
        difficulty: "medium",
        type: "Intervals",
        mark: 10,
        event_uid: ""
    },

    // ----- Binary Search -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Binary Search",
        description: "Given a sorted array, search for a target value.\n\nInput: [-1,0,3,5,9,12], target=9\nOutput: 4",
        difficulty: "easy",
        type: "Binary Search",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Search in Rotated Sorted Array",
        description: "Search for a target in a rotated sorted array.\n\nInput: [4,5,6,7,0,1,2], target=0\nOutput: 4",
        difficulty: "medium",
        type: "Binary Search",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Search in Rotated Sorted Array II",
        description: "Search in rotated array containing duplicates.\n\nInput: [2,5,6,0,0,1,2], target=0\nOutput: true",
        difficulty: "medium",
        type: "Binary Search",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find Minimum in Rotated Sorted Array II",
        description: "Find minimum in rotated sorted array with duplicates.\n\nInput: [1,3,5]\nOutput: 1",
        difficulty: "hard",
        type: "Binary Search",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Time Based Key-Value Store",
        description: "Store multiple values for the same key at different time stamps.\n\nInput: set('foo','bar',1), get('foo',1)\nOutput: 'bar'",
        difficulty: "medium",
        type: "Binary Search",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Median of Two Sorted Arrays",
        description: "Find the median of two sorted arrays.\n\nInput: [1,3], [2]\nOutput: 2.0",
        difficulty: "hard",
        type: "Binary Search",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Koko Eating Bananas",
        description: "Find minimum integer k such that she can eat all bananas within h hours.\n\nInput: piles=[3,6,7,11], h=8\nOutput: 4",
        difficulty: "medium",
        type: "Binary Search",
        mark: 10,
        event_uid: ""
    },

    // ----- Math / Geometry -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Happy Number",
        description: "Determine if a number is happy.\n\nInput: 19\nOutput: true",
        difficulty: "easy",
        type: "Math",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Plus One",
        description: "Increment the large integer represented as an array by one.\n\nInput: [1,2,3]\nOutput: [1,2,4]",
        difficulty: "easy",
        type: "Math",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Sqrt(x)",
        description: "Compute and return the square root of x.\n\nInput: 4\nOutput: 2",
        difficulty: "easy",
        type: "Math",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Palindrome Number",
        description: "Determine whether an integer is a palindrome.\n\nInput: 121\nOutput: true",
        difficulty: "easy",
        type: "Math",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Multiply Strings",
        description: "Multiply two non-negative integers represented as strings.\n\nInput: '2', '3'\nOutput: '6'",
        difficulty: "medium",
        type: "Math",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Rotate Image",
        description: "Rotate the n x n matrix by 90 degrees.\n\nInput: [[1,2],[3,4]]\nOutput: [[3,1],[4,2]]",
        difficulty: "medium",
        type: "Math",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Divide Two Integers",
        description: "Divide two integers without using multiplication, division, and mod operator.\n\nInput: 10, 3\nOutput: 3",
        difficulty: "medium",
        type: "Math",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Max Points on a Line",
        description: "Find the maximum number of points that lie on the same straight line.\n\nInput: [[1,1],[2,2],[3,3]]\nOutput: 3",
        difficulty: "hard",
        type: "Math",
        mark: 15,
        event_uid: ""
    },

    // ----- Misc Filling to reach 200 -----
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Design HashMap",
        description: "Design a HashMap without using any built-in hash table libraries.\n\nInput: put(1,1), get(1)\nOutput: 1",
        difficulty: "easy",
        type: "Design",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Design HashSet",
        description: "Design a HashSet without using any built-in hash table libraries.\n\nInput: add(1), contains(1)\nOutput: true",
        difficulty: "easy",
        type: "Design",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Design Twitter",
        description: "Design a simplified version of Twitter.\n\nInput: postTweet, getNewsFeed\nOutput: Feed",
        difficulty: "medium",
        type: "Design",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Isomorphic Strings",
        description: "Determine if two strings are isomorphic.\n\nInput: s='egg', t='add'\nOutput: true",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Subsequence",
        description: "Check if s is a subsequence of t.\n\nInput: s='abc', t='ahbgdc'\nOutput: true",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Length of Last Word",
        description: "Return the length of the last word in the string.\n\nInput: 'Hello World'\nOutput: 5",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Ransom Note",
        description: "Check if note can be constructed from magazine.\n\nInput: 'a', 'b'\nOutput: false",
        difficulty: "easy",
        type: "String",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Majority Element",
        description: "Find the majority element (appears > n/2 times).\n\nInput: [3,2,3]\nOutput: 3",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Remove Element",
        description: "Remove all occurrences of val in-place.\n\nInput: [3,2,2,3], val=3\nOutput: 2, [2,2]",
        difficulty: "easy",
        type: "Array",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find First and Last Position of Element in Sorted Array",
        description: "Find start and end position of target.\n\nInput: [5,7,7,8,8,10], target=8\nOutput: [3,4]",
        difficulty: "medium",
        type: "Binary Search",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Search Insert Position",
        description: "Return the index where the target is found or should be inserted.\n\nInput: [1,3,5,6], target=5\nOutput: 2",
        difficulty: "easy",
        type: "Binary Search",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "First Bad Version",
        description: "Find the first bad version.\n\nInput: n=5, bad=4\nOutput: 4",
        difficulty: "easy",
        type: "Binary Search",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Squares of a Sorted Array",
        description: "Return array of squares of sorted array, sorted.\n\nInput: [-4,-1,0,3,10]\nOutput: [0,1,9,16,100]",
        difficulty: "easy",
        type: "Two Pointers",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Daily Temperatures",
        description: "Number of days you have to wait for a warmer temperature.\n\nInput: [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]",
        difficulty: "medium",
        type: "Stack",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Online Stock Span",
        description: "Calculate the span of stock's price for the current day.\n\nInput: price 100, 80, 60, 70\nOutput: 1, 1, 1, 2",
        difficulty: "medium",
        type: "Stack",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Largest Rectangle in Histogram",
        description: "Find the largest rectangle area in histogram.\n\nInput: [2,1,5,6,2,3]\nOutput: 10",
        difficulty: "hard",
        type: "Stack",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Basic Calculator",
        description: "Implement a basic calculator to evaluate a simple expression string.\n\nInput: '(1+(4+5+2)-3)+(6+8)'\nOutput: 23",
        difficulty: "hard",
        type: "Stack",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Basic Calculator II",
        description: "Calculate expression with +,-,*,/.\n\nInput: '3+2*2'\nOutput: 7",
        difficulty: "medium",
        type: "Stack",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Simplify Path",
        description: "Convert absolute path to canonical path.\n\nInput: '/home//foo/'\nOutput: '/home/foo'",
        difficulty: "medium",
        type: "Stack",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Verify Preorder Serialization of a Binary Tree",
        description: "Check if string is valid preorder serialization.\n\nInput: '9,3,4,#,#,1,#,#,2,#,6,#,#'\nOutput: true",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find Duplicate Subtrees",
        description: "Return all duplicate subtrees.\n\nInput: root\nOutput: nodes",
        difficulty: "medium",
        type: "Binary Tree",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Delete Node in a BST",
        description: "Delete a node in BST and maintain BST property.\n\nInput: root, key\nOutput: root",
        difficulty: "medium",
        type: "BST",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Trim a Binary Search Tree",
        description: "Trim the tree so all elements lie in [low, high].\n\nInput: root, 1, 3\nOutput: root",
        difficulty: "medium",
        type: "BST",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Convert Sorted Array to BST",
        description: "Convert sorted array to height balanced BST.\n\nInput: [-10,-3,0,5,9]\nOutput: [0,-3,9,-10,null,5]",
        difficulty: "easy",
        type: "BST",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Two Sum IV - Input is a BST",
        description: "Check if two elements sum to k in BST.\n\nInput: root, k\nOutput: true",
        difficulty: "easy",
        type: "BST",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Minimum Distance Between BST Nodes",
        description: "Find minimum difference between values of any two nodes.\n\nInput: root\nOutput: 1",
        difficulty: "easy",
        type: "BST",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Increasing Order Search Tree",
        description: "Rearrange BST to be in-order increasing.\n\nInput: root\nOutput: newRoot",
        difficulty: "easy",
        type: "BST",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Minimum Absolute Difference in BST",
        description: "Find absolute minimum difference between any two nodes.\n\nInput: [1,null,3,2]\nOutput: 1",
        difficulty: "easy",
        type: "BST",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Flood Fill",
        description: "Perform flood fill on the image.\n\nInput: image, sr, sc, color\nOutput: modified image",
        difficulty: "easy",
        type: "Graph",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Island Perimeter",
        description: "Determine the perimeter of the island.\n\nInput: grid\nOutput: 16",
        difficulty: "easy",
        type: "Graph",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find the Town Judge",
        description: "Find the judge who trusts nobody but is trusted by everyone.\n\nInput: N=3, trust=[[1,3],[2,3]]\nOutput: 3",
        difficulty: "easy",
        type: "Graph",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Keys and Rooms",
        description: "Check if you can visit all rooms.\n\nInput: [[1],[2],[3],[]]\nOutput: true",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "As Far from Land as Possible",
        description: "Find a water cell such that its distance to the nearest land cell is maximized.\n\nInput: grid\nOutput: 2",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Shortest Path in Binary Matrix",
        description: "Find shortest clear path from top-left to bottom-right.\n\nInput: grid\nOutput: 2",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Path with Maximum Probability",
        description: "Find path with max probability of success.\n\nInput: n, edges, probs, start, end\nOutput: 0.25",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Minimum Height Trees",
        description: "Find all roots for minimum height trees.\n\nInput: n, edges\nOutput: [1]",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reconstruct Itinerary",
        description: "Reconstruct the itinerary in lexical order.\n\nInput: [['MUC','LHR'],...]\nOutput: ['JFK','MUC',...]",
        difficulty: "hard",
        type: "Graph",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Evaluate Division",
        description: "Evaluate queries given equations.\n\nInput: eq=[['a','b']], val=[2.0], q=[['a','b']]\nOutput: [2.0]",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Snakes and Ladders",
        description: "Least moves to reach square n*n.\n\nInput: board\nOutput: 4",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Open the Lock",
        description: "Find minimum turns to open the lock.\n\nInput: deadends, target\nOutput: 6",
        difficulty: "medium",
        type: "Graph",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Making A Large Island",
        description: "Change at most one 0 to 1 to make largest island.\n\nInput: grid\nOutput: 3",
        difficulty: "hard",
        type: "Graph",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Word Ladder II",
        description: "Find all shortest transformation sequences.\n\nInput: beginWord, endWord, wordList\nOutput: [['hit','hot','dot','dog','cog'],...]",
        difficulty: "hard",
        type: "Graph",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Distinct Subsequences",
        description: "Count distinct subsequences of s which equals t.\n\nInput: s='rabbbit', t='rabbit'\nOutput: 3",
        difficulty: "hard",
        type: "DP",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Dungeon Game",
        description: "Find minimum initial health to reach bottom right.\n\nInput: dungeon\nOutput: 7",
        difficulty: "hard",
        type: "DP",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Minimum Window Substring",
        description: "Find smallest window in S containing all chars of T.\n\nInput: S='ADOBECODEBANC', T='ABC'\nOutput: 'BANC'",
        difficulty: "hard",
        type: "Sliding Window",
        mark: 15,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Permutation in String",
        description: "Check if s2 contains a permutation of s1.\n\nInput: s1='ab', s2='eidbaooo'\nOutput: true",
        difficulty: "medium",
        type: "Sliding Window",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Find All Anagrams in a String",
        description: "Find all start indices of p's anagrams in s.\n\nInput: s='cbaebabacd', p='abc'\nOutput: [0,6]",
        difficulty: "medium",
        type: "Sliding Window",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Longest Substring Without Repeating Characters",
        description: "Find length of longest substring without repeating chars.\n\nInput: 'abcabcbb'\nOutput: 3",
        difficulty: "medium",
        type: "Sliding Window",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Max Consecutive Ones III",
        description: "Max consecutive 1s if you can flip at most K 0s.\n\nInput: [1,1,1,0,0,0,1,1,1,1,0], K=2\nOutput: 6",
        difficulty: "medium",
        type: "Sliding Window",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Subarray Product Less Than K",
        description: "Count subarrays where product is strictly less than k.\n\nInput: [10,5,2,6], k=100\nOutput: 8",
        difficulty: "medium",
        type: "Sliding Window",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Fruit Into Baskets",
        description: "Max number of fruits you can pick with 2 baskets.\n\nInput: [1,2,1]\nOutput: 3",
        difficulty: "medium",
        type: "Sliding Window",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Sort Colors",
        description: "Sort array of 0s, 1s, and 2s in-place.\n\nInput: [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]",
        difficulty: "medium",
        type: "Two Pointers",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Remove Duplicates from Sorted Array II",
        description: "Remove duplicates allowing at most 2 occurrences.\n\nInput: [1,1,1,2,2,3]\nOutput: 5, [1,1,2,2,3]",
        difficulty: "medium",
        type: "Two Pointers",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Valid Palindrome II",
        description: "Check if palindrome after deleting at most 1 char.\n\nInput: 'abca'\nOutput: true",
        difficulty: "easy",
        type: "Two Pointers",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Boats to Save People",
        description: "Min boats to save people given weight limit.\n\nInput: people=[3,2,2,1], limit=3\nOutput: 3",
        difficulty: "medium",
        type: "Two Pointers",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Reverse String",
        description: "Reverse string in-place.\n\nInput: ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']",
        difficulty: "easy",
        type: "Two Pointers",
        mark: 5,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Two Sum II - Input Array Is Sorted",
        description: "Find two numbers that add up to target in sorted array.\n\nInput: [2,7,11,15], target=9\nOutput: [1,2]",
        difficulty: "medium",
        type: "Two Pointers",
        mark: 10,
        event_uid: ""
    },
    {
        createdBy: "sdfhhf",
        createdBy_uid: "sldfiofdsu",
        title: "Squares of a Sorted Array",
        description: "Return array of squares of sorted array.\n\nInput: [-4,-1,0,3,10]\nOutput: [0,1,9,16,100]",
        difficulty: "easy",
        type: "Two Pointers",
        mark: 5,
        event_uid: ""
    }
];





const fetch_All_Users_Information = async () => {
    try {

        const ref = collection(db, 'Students');
        const response = await getDocs(ref);

        // const data = response.

        const data = response.docs.map((doc) => ({
            id: doc.id,       // include doc id
            ...doc.data(),    // spread event fields
        }));



        return {
            success: true,
            message: '',
            data: data
        }

    } catch (error) {
        console.error(error)
    }
}

const uploadQuestions = async ({
       title,
       description,
       mark,
       difficulty,
       type,
       event_uid,
       createdBy,
       createdBy_uid
   }) => {
    try {
        const ref = collection(db, 'questions');

        const response = await addDoc(ref, {
            title: title || "",
            description: description || "",
            mark: mark ?? 0,
            difficulty: difficulty || "",
            type: type || "",
            event_uid: event_uid || "",
            createdBy: createdBy || "",
            createdBy_uid: createdBy_uid || ""
        });

        return {
            success: true,
            message: 'Uploaded',
            id: response.id // returning the generated doc id if needed
        };
    } catch (error) {
        console.error("Error uploading question:", error);
        return {
            success: false,
            message: error.message
        };
    }
};



const showAllUser = async () => {
    const uploadedQuestion = [];
    const uploadedUser = [];

    const response = await fetch_All_Users_Information(); // { data: [...] }
    const totalQuestions = questions.length; // use actual question array length
    let uploadCounter = 0;

    while (uploadedQuestion.length < 215) {
        // Pick a random user
        let randomUserIndex;
        do {
            randomUserIndex = Math.floor(Math.random() * response.data.length);
        } while (uploadedUser.includes(randomUserIndex));

        uploadedUser.push(randomUserIndex);
        const user = response.data[randomUserIndex];
        const createdBy_name = `${user.firstName} ${user.lastName}`;
        const createdBy_uid = user.id;

        // Pick 5 unique questions for this user
        let questionsForUser = 0;
        const userQuestions = [];
        while (questionsForUser < 5 && uploadedQuestion.length < 215) {
            let randomQuestionIndex;
            do {
                randomQuestionIndex = Math.floor(Math.random() * totalQuestions);
            } while (uploadedQuestion.includes(randomQuestionIndex));

            uploadedQuestion.push(randomQuestionIndex);
            userQuestions.push(randomQuestionIndex);

            // Get actual question object
            const question = questions[randomQuestionIndex];

            // Upload question with correct createdBy info
            await uploadQuestions({
                title: question.title,
                description: question.description,
                mark: question.mark,
                difficulty: question.difficulty,
                type: question.type,
                event_uid: question.event_uid || "",
                createdBy: createdBy_name,
                createdBy_uid: createdBy_uid
            });

            questionsForUser++;
        }

        uploadCounter++;
        console.log(`Upload #${uploadCounter}: User ${createdBy_name} assigned questions: ${userQuestions.join(", ")}`);
    }

    console.log("All uploads done!");
    console.log("Total users uploaded:", uploadedUser.length);
    console.log("Total questions uploaded:", uploadedQuestion.length);
};


const fetchAndDelete = async () => {
    try {
        const q = query(
            collection(db, 'questions'),
            where('createdBy_uid', '==', '')
        );

        const response = await getDocs(q);

        // Loop & delete each matched document
        const deletePromises = response.docs.map((d) =>
            deleteDoc(doc(db, 'questions', d.id))
        );

        await Promise.all(deletePromises);

        return {
            success: true,
            message: "All matching documents deleted",
        };

    } catch (error) {
        console.error("Error deleting questions:", error);
        return { success: false };
    }
};


// fetchAndDelete().then(() => {
//     console.log("Deleting questions Done");
// })



showAllUser().then( () => {
    console.log('Uploaded')
});

 */







const eventsArray = [
    {
        title: "Dynamic Programming & Grid Mastery",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "10:00 AM",
        duration: "2h",
        eventDescription:
            "This event focuses on medium to hard dynamic programming and grid-based problems frequently seen on LeetCode and competitive programming contests. Participants will work on path optimization, state transition logic, overlapping subproblems, recursion-to-DP conversion, and high-efficiency computation. The goal is to strengthen intuition in designing DP states, minimizing redundancy, and producing optimized code suitable for interviews and competitions.",
        questions: [
            {
                title: "Minimum Path Sum in Grid",
                difficulty: "Medium",
                points: 20,
                description: `You are given a 2D grid of positive integers representing movement costs. You start at the top-left corner (0,0) and may only move either right or down. Compute the minimum total cost path to reach the bottom-right cell. This problem tests dynamic programming tabulation or memoization approaches.

Input:
grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]

Output:
7

Explanation:
The optimal path is 1 → 3 → 1 → 1 → 1 with a total cost of 7.`
            },
            {
                title: "Maximum Score Path with Obstacles",
                difficulty: "Medium",
                points: 25,
                description: `Given a grid of integers where each value represents points you gain upon stepping into a cell, calculate the maximum total value achievable moving from the top-left to the bottom-right. Cells with -1 are blocked. Use dynamic programming to find the optimal path avoiding obstacles.

Input:
grid = [
  [1, 2, 3],
  [2, -1, 4],
  [5, 2, 1]
]

Output:
12

Explanation:
One optimal path is 1 → 2 → 3 → 4 → 1 summing to 12.`
            },
            {
                title: "Unique Paths with Step Limit",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given m, n, and k (grid size and maximum number of moves), compute how many unique paths exist from top-left to bottom-right moving only right or down within at most k steps. Requires multidimensional DP tracking position and steps.

Input:
m = 3, n = 3, k = 4

Output:
2

Explanation:
Only two valid paths reach the destination in at most 4 steps.`
            },
            {
                title: "Minimum Deletion Cost to Make Strings Equal",
                difficulty: "Hard",
                points: 40,
                description: `Given two strings s1 and s2 and arrays cost1 and cost2 representing deletion costs, find the minimum total cost to make both strings equal. Only deletions are allowed.

Input:
s1 = "sea"
s2 = "eat"
cost1 = [2,3,1]
cost2 = [1,2,4]

Output:
3

Explanation:
Deleting 's' from s1 (cost 2) and 't' from s2 (cost 1) yields matching strings at minimum total cost 3.`
            },
            {
                title: "Minimum Falling Path Sum with Column Restriction",
                difficulty: "Hard",
                points: 50,
                description: `You are given an n×n grid of integers representing costs of stepping into positions. Starting from any cell in the top row, move downward choosing one cell per row. From each position (r,c), you may move to (r+1,c), (r+1,c-1), or (r+1,c+1), but may not revisit any previously chosen column. Find the minimum total cost.

Input:
grid = [
  [2,1,3],
  [6,5,4],
  [7,8,9]
]

Output:
13

Explanation:
Path 2 → 1 → 4 gives cost 7, but since columns cannot repeat, the best valid path has cost 13.`
            }
        ]
    },

    {
        title: "Graph Algorithms Challenge",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "11:00 AM",
        duration: "3h",
        eventDescription:
            "This event is centered on graph theory problems including BFS, DFS, Dijkstra, topological sorting, and cycle detection. Participants must design optimized graph algorithms and handle edge cases on large datasets.",
        questions: [
            {
                title: "Shortest Path in Weighted Graph",
                difficulty: "Medium",
                points: 20,
                description: `Given a directed graph with weighted edges, find the shortest path from node s to node t. Uses Dijkstra or BFS with weight tracking.

Input:
edges = [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]], s = 0, t = 3

Output:
4

Explanation:
Path 0 → 2 → 1 → 3 has total weight 1+2+1 = 4, which is minimal.`
            },
            {
                title: "Detect Cycle in Directed Graph",
                difficulty: "Medium",
                points: 20,
                description: `Determine whether a directed graph contains a cycle using DFS or topological sorting.

Input:
edges = [[0,1],[1,2],[2,0]]

Output:
true

Explanation:
0 → 1 → 2 → 0 forms a cycle.`
            },
            {
                title: "Strongly Connected Components",
                difficulty: "Hard",
                points: 30,
                description: `Given a directed graph, return all its strongly connected components using Tarjan's or Kosaraju's algorithm.

Input:
edges = [[0,1],[1,2],[2,0],[1,3]]

Output:
[[0,1,2],[3]]

Explanation:
Nodes 0,1,2 form a cycle (SCC) and 3 is separate.`
            },
            {
                title: "Minimum Edge Reversal to Reach Target",
                difficulty: "Hard",
                points: 30,
                description: `Given a directed graph, find the minimum number of edges that must be reversed to create a path from source to target.

Input:
edges = [[0,1],[2,1],[1,3]], s = 0, t = 3

Output:
1

Explanation:
Reversing edge 2→1 allows path 0→1→3.`
            },
            {
                title: "Course Schedule Order",
                difficulty: "Medium",
                points: 20,
                description: `Given number of courses and prerequisites, determine a valid order to complete all courses using topological sort.

Input:
numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]

Output:
[0,1,2,3]

Explanation:
0 → 1 → 2 → 3 is a valid order satisfying prerequisites.`
            }
        ]
    },

    {
        title: "Binary Tree & BST Mastery",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "12:00 PM",
        duration: "3h",
        eventDescription:
            "This event covers binary trees, binary search trees, recursion, DFS, tree traversal, and tree reconstruction. Participants will solve medium-to-hard problems requiring pointer manipulation and tree property reasoning.",
        questions: [
            {
                title: "Lowest Common Ancestor in Binary Tree",
                difficulty: "Medium",
                points: 20,
                description: `Given a binary tree and two nodes, return their lowest common ancestor.

Input:
root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1

Output:
3

Explanation:
Node 3 is the lowest ancestor of nodes 5 and 1.`
            },
            {
                title: "Validate Binary Search Tree",
                difficulty: "Medium",
                points: 20,
                description: `Check whether a given binary tree satisfies BST ordering.

Input:
root = [2,1,3]

Output:
true

Explanation:
Tree satisfies BST properties: left < root < right.`
            },
            {
                title: "Recover Corrupted BST",
                difficulty: "Hard",
                points: 30,
                description: `Two nodes of a BST are swapped. Restore the BST without changing structure.

Input:
root = [3,1,4,null,null,2]

Output:
[2,1,4,null,null,3]

Explanation:
Nodes 3 and 2 were swapped. Restoring order corrects BST.`
            },
            {
                title: "Binary Tree Right Side View",
                difficulty: "Medium",
                points: 20,
                description: `Return the visible nodes from the right side of a binary tree.

Input:
root = [1,2,3,null,5,null,4]

Output:
[1,3,4]

Explanation:
From right, visible nodes are 1,3,4.`
            },
            {
                title: "Serialize and Deserialize Binary Tree",
                difficulty: "Hard",
                points: 30,
                description: `Implement serialization and deserialization for a binary tree.

Input:
root = [1,2,3,null,null,4,5]

Output:
[1,2,3,null,null,4,5]

Explanation:
Serialized tree matches structure and can be deserialized back.`
            }
        ]
    },

    {
        title: "Advanced String Algorithms",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "01:00 PM",
        duration: "3h",
        eventDescription:
            "This event challenges participants with medium-to-hard string manipulation problems. Topics include pattern matching, string compression, palindrome detection, edit distance, and rolling hash algorithms. Participants will practice efficient string processing, DP on strings, and hashing techniques used in competitive programming and coding interviews.",
        questions: [
            {
                title: "Longest Palindromic Substring",
                difficulty: "Medium",
                points: 20,
                description: `Given a string s, find the longest substring which reads the same backward and forward.

Input:
s = "babad"

Output:
"bab" or "aba"

Explanation:
The longest palindromic substring is "bab" (or "aba" as another valid option).`
            },
            {
                title: "Edit Distance Calculation",
                difficulty: "Hard",
                points: 30,
                description: `Compute the minimum number of operations to convert one string into another. Operations allowed: insert, delete, replace a character.

Input:
s1 = "kitten", s2 = "sitting"

Output:
3

Explanation:
Operations: replace 'k' → 's', replace 'e' → 'i', append 'g'.`
            },
            {
                title: "Rabin-Karp Pattern Matching",
                difficulty: "Medium",
                points: 20,
                description: `Detect all occurrences of a pattern in a string using rolling hash.

Input:
Text = "ababcabc", Pattern = "abc"

Output:
[2,5]

Explanation:
Pattern "abc" occurs at indices 2 and 5.`
            },
            {
                title: "String Compression",
                difficulty: "Medium",
                points: 20,
                description: `Compress a string using counts of repeated characters. Replace sequences with char + count.

Input:
s = "aaabbc"

Output:
"a3b2c1"

Explanation:
Sequences: 'aaa' → 'a3', 'bb' → 'b2', 'c' → 'c1'.`
            },
            {
                title: "Minimum Window Substring",
                difficulty: "Hard",
                points: 30,
                description: `Find the smallest substring of s that contains all characters of t.

Input:
s = "ADOBECODEBANC", t = "ABC"

Output:
"BANC"

Explanation:
"BANC" is the smallest substring containing 'A','B','C'.`
            }
        ]
    },
    {
        title: "Graph Theory & Shortest Paths",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "02:00 PM",
        duration: "3h",
        eventDescription:
            "Participants solve graph problems involving shortest paths, connectivity, cycles, and optimization. This event emphasizes Dijkstra, Bellman-Ford, BFS/DFS, and topological sort for medium-to-hard challenges.",
        questions: [
            {
                title: "Network Delay Time",
                difficulty: "Medium",
                points: 20,
                description: `Given times as edges [u,v,w], find time for signal to reach all nodes from source.

Input:
times = [[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2

Output:
2

Explanation:
Signal reaches all nodes in 2 units of time.`
            },
            {
                title: "Detect Cycle in Undirected Graph",
                difficulty: "Medium",
                points: 20,
                description: `Check if an undirected graph contains a cycle.

Input:
edges = [[0,1],[1,2],[2,0]]

Output:
true

Explanation:
Nodes 0-1-2-0 form a cycle.`
            },
            {
                title: "Critical Connections in a Network",
                difficulty: "Hard",
                points: 30,
                description: `Find edges which, if removed, increase the number of connected components (bridges).

Input:
n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]

Output:
[[1,3]]

Explanation:
Removing edge [1,3] disconnects the network.`
            },
            {
                title: "Cheapest Flights Within K Stops",
                difficulty: "Hard",
                points: 30,
                description: `Find cheapest flight from src to dst with ≤ K stops.

Input:
n = 4, flights = [[0,1,100],[1,2,100],[2,3,100],[0,3,500]], src = 0, dst = 3, K = 1

Output:
500

Explanation:
Only path within 1 stop is 0 → 3 directly at cost 500.`
            },
            {
                title: "Minimum Spanning Tree",
                difficulty: "Medium",
                points: 20,
                description: `Given a weighted undirected graph, find the total weight of MST using Kruskal's algorithm.

Input:
edges = [[0,1,1],[0,2,2],[1,2,3]], n = 3

Output:
3

Explanation:
Edges 0-1 and 0-2 give MST weight 1+2=3.`
            }
        ]
    },
    {
        title: "Binary Search & Arrays",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "03:00 PM",
        duration: "2h",
        eventDescription:
            "Participants solve array and binary search problems including searching, rotations, partitioning, and subarray optimization. Challenges are medium-to-hard and require efficient O(log n) or O(n) algorithms.",
        questions: [
            {
                title: "Search in Rotated Sorted Array",
                difficulty: "Medium",
                points: 20,
                description: `Search a target value in a rotated sorted array.

Input:
nums = [4,5,6,7,0,1,2], target = 0

Output:
4

Explanation:
0 is at index 4.`
            },
            {
                title: "Median of Two Sorted Arrays",
                difficulty: "Hard",
                points: 30,
                description: `Find the median of two sorted arrays in O(log (m+n)) time.

Input:
nums1 = [1,3], nums2 = [2]

Output:
2.0

Explanation:
Merged array [1,2,3], median is 2.`
            },
            {
                title: "Find Peak Element",
                difficulty: "Medium",
                points: 20,
                description: `Return index of any peak element in array where nums[i] ≠ nums[i+1].

Input:
nums = [1,2,3,1]

Output:
2

Explanation:
3 is a peak element at index 2.`
            },
            {
                title: "First and Last Position of Element",
                difficulty: "Medium",
                points: 20,
                description: `Find first and last position of a target in sorted array.

Input:
nums = [5,7,7,8,8,10], target = 8

Output:
[3,4]

Explanation:
Target 8 occurs at indices 3 and 4.`
            },
            {
                title: "Search Insert Position",
                difficulty: "Medium",
                points: 20,
                description: `Return index where target should be inserted in sorted array.

Input:
nums = [1,3,5,6], target = 5

Output:
2

Explanation:
Target 5 exists at index 2.`
            }
        ]
    },
    {
        title: "Backtracking & Combinatorics",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "04:00 PM",
        duration: "3h",
        eventDescription:
            "This event includes backtracking problems such as N-Queens, permutations, combinations, Sudoku solving, and word search. Participants must implement recursion efficiently to handle medium-to-hard problems.",
        questions: [
            {
                title: "N-Queens Problem",
                difficulty: "Hard",
                points: 30,
                description: `Place n queens on an n×n chessboard so that no two queens attack each other. Return all valid solutions.

Input:
n = 4

Output:
[
 [".Q..","...Q","Q...","..Q."],
 ["..Q.","Q...","...Q",".Q.."]
]

Explanation:
Two solutions exist for 4x4 board.`
            },
            {
                title: "Word Search",
                difficulty: "Medium",
                points: 20,
                description: `Check if a word exists in a 2D board following adjacent letters (horizontally/vertically).

Input:
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"

Output:
true

Explanation:
Word can be formed by moving adjacent cells.`
            },
            {
                title: "Letter Combinations of a Phone Number",
                difficulty: "Medium",
                points: 20,
                description: `Return all possible letter combinations from a phone number string.

Input:
digits = "23"

Output:
["ad","ae","af","bd","be","bf","cd","ce","cf"]

Explanation:
Digit mapping forms these combinations.`
            },
            {
                title: "Palindrome Partitioning",
                difficulty: "Hard",
                points: 30,
                description: `Partition a string into all possible palindrome substrings.

Input:
s = "aab"

Output:
[["aa","b"],["a","a","b"]]

Explanation:
All partitions where every substring is a palindrome.`
            },
            {
                title: "Combination Sum",
                difficulty: "Medium",
                points: 20,
                description: `Find all unique combinations where candidate numbers sum to target.

Input:
candidates = [2,3,6,7], target = 7

Output:
[[7],[2,2,3]]

Explanation:
Only these combinations sum to 7.`
            }
        ]
    },
    {
        title: "Heap & Priority Queue Challenges",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "05:00 PM",
        duration: "2h",
        eventDescription:
            "Medium-to-hard heap and priority queue problems including top-K, merging arrays, running medians, and interval scheduling.",
        questions: [
            {
                title: "Kth Largest Element in Array",
                difficulty: "Medium",
                points: 20,
                description: `Find the kth largest element in an unsorted array.

Input:
nums = [3,2,1,5,6,4], k = 2

Output:
5

Explanation:
Second largest element is 5.`
            },
            {
                title: "Merge K Sorted Lists",
                difficulty: "Hard",
                points: 30,
                description: `Merge k sorted linked lists into one sorted list using min-heap.

Input:
lists = [[1,4,5],[1,3,4],[2,6]]

Output:
[1,1,2,3,4,4,5,6]

Explanation:
All lists merged into sorted order.`
            },
            {
                title: "Top K Frequent Elements",
                difficulty: "Medium",
                points: 20,
                description: `Return k most frequent elements from array.

Input:
nums = [1,1,1,2,2,3], k = 2

Output:
[1,2]

Explanation:
1 occurs 3 times, 2 occurs 2 times.`
            },
            {
                title: "Sliding Window Maximum",
                difficulty: "Hard",
                points: 30,
                description: `Find max in each sliding window of size k.

Input:
nums = [1,3,-1,-3,5,3,6,7], k = 3

Output:
[3,3,3,5,5,6,7]

Explanation:
Max of each window computed efficiently.`
            }
        ]
    },
    {
        title: "Bit Manipulation & Math",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "06:00 PM",
        duration: "2h",
        eventDescription:
            "Medium-to-hard bit manipulation and math problems including XOR, AND, OR, counting bits, number theory, and combinatorial computations.",
        questions: [
            {
                title: "Single Number",
                difficulty: "Medium",
                points: 20,
                description: `Given a non-empty array where every element appears twice except one, find that single element using bitwise operations.

Input:
nums = [2,2,1]

Output:
1

Explanation:
XOR cancels out duplicates, leaving 1.`
            },
            {
                title: "Counting Bits",
                difficulty: "Medium",
                points: 20,
                description: `Return an array of counts of 1s in binary representation for numbers 0..n.

Input:
n = 5

Output:
[0,1,1,2,1,2]

Explanation:
Binary counts of each number.`
            },
            {
                title: "Power of Two",
                difficulty: "Medium",
                points: 20,
                description: `Check if a number is a power of two using bit manipulation.

Input:
n = 16

Output:
true

Explanation:
16 = 2^4.`
            },
            {
                title: "Reverse Bits",
                difficulty: "Hard",
                points: 30,
                description: `Reverse bits of a given 32-bit unsigned integer.

Input:
n = 43261596

Output:
964176192

Explanation:
Binary representation reversed.`
            },
            {
                title: "Number of 1 Bits",
                difficulty: "Medium",
                points: 20,
                description: `Count the number of '1' bits in a 32-bit integer.

Input:
n = 11

Output:
3

Explanation:
Binary 1011 has 3 ones.`
            }
        ]
    },
    {
        title: "Greedy Algorithms & Intervals",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-22",
        startTime: "07:00 PM",
        duration: "2h",
        eventDescription:
            "Medium-to-hard greedy algorithm problems including interval scheduling, activity selection, coin change, and optimization tasks that can be solved with local decisions.",
        questions: [
            {
                title: "Non-overlapping Intervals",
                difficulty: "Medium",
                points: 20,
                description: `Given intervals, remove minimum number to make all intervals non-overlapping.

Input:
intervals = [[1,2],[2,3],[3,4],[1,3]]

Output:
1

Explanation:
Removing [1,3] makes intervals non-overlapping.`
            },
            {
                title: "Assign Cookies",
                difficulty: "Medium",
                points: 20,
                description: `Assign cookies to children to maximize satisfied children using greedy approach.

Input:
g = [1,2,3], s = [1,1]

Output:
1

Explanation:
Only one child can be satisfied.`
            },
            {
                title: "Jump Game",
                difficulty: "Medium-Hard",
                points: 25,
                description: `Determine if you can reach the last index in array where each element represents max jump length.

Input:
nums = [2,3,1,1,4]

Output:
true

Explanation:
Jump sequence 0→1→4 reaches last index.`
            },
            {
                title: "Minimum Number of Arrows to Burst Balloons",
                difficulty: "Hard",
                points: 30,
                description: `Find min arrows to burst all balloons represented as intervals.

Input:
points = [[10,16],[2,8],[1,6],[7,12]]

Output:
2

Explanation:
Shoot arrows at 6 and 12 to burst all.`
            },
            {
                title: "Gas Station",
                difficulty: "Medium",
                points: 20,
                description: `Determine if there is a starting gas station to travel around circuit.

Input:
gas = [1,2,3,4,5], cost = [3,4,5,1,2]

Output:
3

Explanation:
Starting at station 3 allows completing circuit.`
            }
        ]
    }
];

const newEventsArray = [

    {
        title: "Arrays & Hashing Fundamentals",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-23",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "This event covers fundamental array manipulation techniques, including two-pointer approaches, prefix sums, and heavy use of hash maps (dictionaries) for O(n) lookups. Focus is on recognizing when to use auxiliary space for efficiency, handling duplicates, and dealing with constraints like integer overflows.",
        questions: [
            {
                title: "Two Sum",
                difficulty: "Easy",
                points: 10,
                description: `Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to 'target'. Assume that each input would have exactly one solution, and you may not use the same element twice.

Input:
nums = [2,7,11,15], target = 9

Output:
[0,1]

Explanation:
nums[0] + nums[1] == 9, so we return [0, 1].`
            },
            {
                title: "Group Anagrams",
                difficulty: "Medium",
                points: 20,
                description: `Given an array of strings 'strs', group the anagrams together. You can return the answer in any order. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Input:
strs = ["eat","tea","tan","ate","nat","bat"]

Output:
[["bat"],["nat","tan"],["ate","eat","tea"]]`
            },
            {
                title: "Product of Array Except Self",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array 'nums', return an array 'answer' such that 'answer[i]' is equal to the product of all the elements of 'nums' except 'nums[i]'. You must write an algorithm that runs in O(n) time and without using the division operation.

Input:
nums = [1,2,3,4]

Output:
[24,12,8,6]`
            },
            {
                title: "Longest Consecutive Sequence",
                difficulty: "Medium",
                points: 30,
                description: `Given an unsorted array of integers 'nums', return the length of the longest consecutive elements sequence. Your algorithm should run in O(n) time.

Input:
nums = [100,4,200,1,3,2]

Output:
4

Explanation:
The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.`
            }
        ]
    },
    {
        title: "Sliding Window Technique",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-23",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focus on the **Sliding Window** pattern, a highly efficient technique used to solve array and string problems in O(n) time. Participants will master fixed-size and variable-size windows, using hash maps or frequency arrays to track window state.",
        questions: [
            {
                title: "Longest Substring Without Repeating Characters",
                difficulty: "Medium",
                points: 20,
                description: `Given a string 's', find the length of the longest substring without repeating characters. This is a classic variable-size sliding window problem.

Input:
s = "abcabcbb"

Output:
3

Explanation:
The answer is "abc", with a length of 3.`
            },
            {
                title: "Permutation in String",
                difficulty: "Medium",
                points: 20,
                description: `Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2. This uses a fixed-size window.

Input:
s1 = "ab", s2 = "eidbaooo"

Output:
true

Explanation:
s2 contains "ba" (a permutation of s1).`
            },
            {
                title: "Minimum Window Substring (Recap)",
                difficulty: "Hard",
                points: 30,
                description: `(Recap) Find the smallest substring of 's' that contains all characters of 't' (including duplicates). This requires a complex variable-size window with two-pointer and frequency map tracking.

Input:
s = "ADOBECODEBANC", t = "ABC"

Output:
"BANC"`
            },
            {
                title: "Max Consecutive Ones III",
                difficulty: "Medium",
                points: 25,
                description: `Given a binary array 'nums' and an integer 'k', return the maximum number of consecutive 1's in the array if you can flip at most 'k' 0's.

Input:
nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2

Output:
6

Explanation:
The longest window after flipping two 0s is 6 (e.g., [1,1,1,0,0,1,1,1,1,1,1]).`
            }
        ]
    },
    {
        title: "Stack, Queue, and Deque Applications",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-23",
        startTime: "01:00 PM",
        duration: "3h",
        eventDescription:
            "A deep dive into classic data structures: Stack (LIFO), Queue (FIFO), and Deque (Double-ended queue). Emphasis on monotonic stacks/queues, expression evaluation, and problems like bracket matching and sliding window maximum (using a Deque).",
        questions: [
            {
                title: "Valid Parentheses",
                difficulty: "Easy",
                points: 10,
                description: `Given a string 's' containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Uses a simple stack.

Input:
s = "()[]{}"

Output:
true`
            },
            {
                title: "Daily Temperatures",
                difficulty: "Medium",
                points: 20,
                description: `Given an array of integers 'temperatures', return an array 'answer' such that 'answer[i]' is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day for which this is possible, keep 'answer[i] == 0'. Solved efficiently with a Monotonic Stack.

Input:
temperatures = [73,74,75,71,69,72,76,73]

Output:
[1,1,4,2,1,1,0,0]`
            },
            {
                title: "Sliding Window Maximum (Deque)",
                difficulty: "Hard",
                points: 30,
                description: `(Recap) Find the maximum value in each sliding window of size 'k' using a Deque (Double-Ended Queue) to maintain a monotonic decreasing sequence of indices.

Input:
nums = [1,3,-1,-3,5,3,6,7], k = 3

Output:
[3,3,3,5,5,6,7]`
            },
            {
                title: "Min Stack",
                difficulty: "Medium",
                points: 25,
                description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1). This requires using an auxiliary stack or careful tracking.

Input:
MinStack(), push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()

Output:
[null, null, null, null, -3, null, 0, -2]`
            }
        ]
    },
    {
        title: "Trie (Prefix Tree) Implementation",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-23",
        startTime: "04:00 PM",
        duration: "2h",
        eventDescription:
            "A specialized event focusing on the **Trie** data structure, optimal for efficient prefix matching and string-related operations. Participants will implement a Trie and use it to solve problems involving searching and data structure design.",
        questions: [
            {
                title: "Implement Trie (Prefix Tree)",
                difficulty: "Medium",
                points: 20,
                description: `Implement the Trie data structure, including the methods 'insert', 'search', and 'startsWith'.

Input:
Trie trie = new Trie(); trie.insert("apple"); trie.search("apple"); trie.startsWith("app"); trie.search("app");

Output:
[null, null, true, true, false]`
            },
            {
                title: "Word Search II",
                difficulty: "Hard",
                points: 40,
                description: `Given an m x n 'board' of characters and a list of strings 'words', return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, and the same letter cell may not be used more than once in the same word. Requires combining DFS/Backtracking with a Trie for optimization.

Input:
board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]

Output:
["oath","eat"]`
            },
            {
                title: "Map Sum Pairs",
                difficulty: "Medium",
                points: 25,
                description: `Implement the 'MapSum' class, which has two methods: 'insert' (a key-value pair) and 'sum' (returns the sum of all the values of keys that start with a given prefix).

Input:
MapSum mapSum = new MapSum(); mapSum.insert("apple", 3); mapSum.sum("ap"); mapSum.insert("app", 2); mapSum.sum("ap");

Output:
[null, null, 3, null, 5]`
            }
        ]
    },
    {
        title: "Advanced Linked Lists & Pointers",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-24",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "This event covers medium-to-hard problems on singly and doubly linked lists. Focus areas include the **Two-Pointer** technique (fast/slow pointers), list reversal, cycle detection (Floyd's algorithm), and in-place list modification.",
        questions: [
            {
                title: "Reverse Linked List",
                difficulty: "Easy",
                points: 10,
                description: `Given the head of a singly linked list, reverse the list, and return the reversed list. Solvable iteratively or recursively.

Input:
head = [1,2,3,4,5]

Output:
[5,4,3,2,1]`
            },
            {
                title: "Linked List Cycle II",
                difficulty: "Medium",
                points: 20,
                description: `Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. Uses Floyd's Tortoise and Hare algorithm.

Input:
head = [3,2,0,-4], pos = 1 (cycle connects to node at index 1)

Output:
Node with value 2`
            },
            {
                title: "Reorder List",
                difficulty: "Medium",
                points: 25,
                description: `Given a singly linked list L: L0→L1→...→Ln-1→Ln, reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→... You may not modify the values in the list's nodes. Only nodes themselves may be changed. Requires splitting, reversing, and merging lists.

Input:
head = [1,2,3,4]

Output:
[1,4,2,3]`
            },
            {
                title: "Merge Two Sorted Lists",
                difficulty: "Easy",
                points: 10,
                description: `Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

Input:
list1 = [1,2,4], list2 = [1,3,4]

Output:
[1,1,2,3,4,4]`
            }
        ]
    },
    {
        title: "Matrix & Grid Traversal (BFS/DFS)",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-24",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focus on grid-based problems, which are often a specialized form of graph problems. Participants will practice Breadth-First Search (BFS) and Depth-First Search (DFS) for finding paths, connected components, and flood fill operations in 2D arrays.",
        questions: [
            {
                title: "Number of Islands",
                difficulty: "Medium",
                points: 20,
                description: `Given an m x n 2D binary grid 'grid' which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. Solved using DFS or BFS to mark visited components. 

Input:
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]

Output:
1`
            },
            {
                title: "Rotting Oranges",
                difficulty: "Medium",
                points: 25,
                description: `You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh orange), 2 (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no fresh oranges remain. If this is impossible, return -1. A classic multi-source BFS problem.

Input:
grid = [[2,1,1],[1,1,0],[0,1,1]]

Output:
4`
            },
            {
                title: "Surrounded Regions",
                difficulty: "Medium",
                points: 30,
                description: `Given an m x n board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region. This is solved by marking 'O's connected to the boundary.

Input:
board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

Output:
[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]`
            }
        ]
    },
    {
        title: "Bit Manipulation & System Design",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-25",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "A mix of two crucial interview areas: **Bit Manipulation** for low-level optimization (XOR, AND, shifts) and **System Design** concepts. Bit manipulation questions focus on finding single/missing numbers and optimizing boolean logic. The design question introduces key non-coding concepts.",
        questions: [
            {
                title: "Single Number II",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array 'nums' where every element appears three times except for one, which appears exactly once. Find the single element. Requires an advanced bit manipulation approach or a custom state machine.

Input:
nums = [0,1,0,1,0,1,99]

Output:
99`
            },
            {
                title: "Maximum XOR of Two Numbers in an Array",
                difficulty: "Hard",
                points: 40,
                description: `Given an integer array 'nums', return the maximum result of 'nums[i] XOR nums[j]', where 0 ≤ i, j < n. The most optimal solution uses a Trie (Prefix Tree) built on the binary representation of the numbers.

Input:
nums = [3,10,5,25,2,8]

Output:
28

Explanation:
5 (0101) XOR 25 (11001) = 28 (11100).`
            },
            {
                title: "Design TinyURL",
                difficulty: "Medium-Hard",
                points: 35,
                description: `Design a system that can shorten a long URL into a short URL, and vice versa. This involves key concepts of System Design like hashing, collision resolution, and database mapping, but is implemented using an in-memory hash map for simplicity.

Input:
encode("https://leetcode.com/problems/design-tinyurl"), decode("http://tinyurl.com/4e9iAk")

Output:
"http://tinyurl.com/4e9iAk", "https://leetcode.com/problems/design-tinyurl"`
            }
        ]
    },

    // --- 17 More Events to reach 20 New Events ---

    {
        title: "Heaps & K-Selection Problems (Recap/Advanced)",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-25",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "A dedicated session on using Heaps (Priority Queues) for Top-K problems, finding medians, and efficient data stream processing. Emphasis is on understanding min-heap vs. max-heap and time complexity O(N log K).",
        questions: [
            {
                title: "Find K Pairs with Smallest Sums",
                difficulty: "Medium-Hard",
                points: 30,
                description: `You are given two sorted integer arrays 'nums1' and 'nums2' and an integer 'k'. Find 'k' pairs $(u,v)$ with the smallest sums, where $u$ is from 'nums1' and $v$ is from 'nums2'. Uses a min-heap.

Input:
nums1 = [1,7,11], nums2 = [2,4,6], k = 3

Output:
[[1,2],[1,4],[1,6]]`
            },
            {
                title: "Find Median from Data Stream",
                difficulty: "Hard",
                points: 40,
                description: `The median is the middle value in an ordered integer list. Design a data structure that supports adding new numbers and finding the median of all elements so far. The optimal solution uses two heaps (a min-heap and a max-heap) to maintain balance.

Input:
MedianFinder(), addNum(1), addNum(2), findMedian(), addNum(3), findMedian()

Output:
[null, null, null, 1.5, null, 2.0]`
            },
            {
                title: "Top K Frequent Words",
                difficulty: "Medium",
                points: 25,
                description: `Given an array of strings 'words' and an integer 'k', return the 'k' most frequent strings. The result should be sorted by frequency from highest to lowest. If two words have the same frequency, the word with the lower alphabetical order comes first. Uses a Min-Heap of size K.

Input:
words = ["i","love","leetcode","i","love","coding"], k = 2

Output:
["i","love"]`
            }
        ]
    },
    {
        title: "Advanced Dynamic Programming on Strings",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-25",
        startTime: "02:00 PM",
        duration: "3h",
        eventDescription:
            "Focuses solely on applying Dynamic Programming to string problems. This involves understanding edit distance, Longest Common Subsequence (LCS), and Longest Palindromic Subsequence (LPS), typically using a 2D DP table.",
        questions: [
            {
                title: "Edit Distance Calculation (Recap)",
                difficulty: "Hard",
                points: 30,
                description: `Compute the minimum number of operations (insert, delete, replace) to convert one string into another. Requires a classic $O(mn)$ DP solution.

Input:
s1 = "intention", s2 = "execution"

Output:
5`
            },
            {
                title: "Longest Common Subsequence",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given two strings 'text1' and 'text2', return the length of their longest common subsequence. If there is no common subsequence, return 0.

Input:
text1 = "abcde", text2 = "ace"

Output:
3

Explanation:
The longest common subsequence is "ace" and its length is 3.`
            },
            {
                title: "Palindromic Substrings",
                difficulty: "Medium",
                points: 20,
                description: `Given a string 's', return the number of palindromic substrings in it. Solved either by expanding around the center or using a DP table.

Input:
s = "aaa"

Output:
6

Explanation:
The 6 palindromic substrings are: "a", "a", "a", "aa", "aa", "aaa".`
            }
        ]
    },
    {
        title: "Interval Scheduling & Merging",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-26",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "A specific event for problems involving time or numerical intervals. The key technique is **sorting** the intervals (by start or end time) and then iterating with a greedy approach to merge, count, or find overlaps.",
        questions: [
            {
                title: "Merge Intervals",
                difficulty: "Medium",
                points: 20,
                description: `Given an array of intervals, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Input:
intervals = [[1,3],[2,6],[8,10],[15,18]]

Output:
[[1,6],[8,10],[15,18]]`
            },
            {
                title: "Insert Interval",
                difficulty: "Medium",
                points: 20,
                description: `Given a set of non-overlapping intervals sorted by their start times, insert a new interval and merge if necessary.

Input:
intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]

Output:
[[1,2],[3,10],[12,16]]`
            },
            {
                title: "Meeting Rooms II (Minimum Rooms)",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given an array of meeting time intervals 'intervals', find the minimum number of conference rooms required. This is optimally solved using a Min-Heap or two sorted pointers (start/end times).

Input:
intervals = [[0,30],[5,10],[15,20]]

Output:
2`
            }
        ]
    },
    {
        title: "Backtracking: Permutations & Combinations (Advanced)",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-26",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focuses on advanced Backtracking problems, specifically handling duplicates and constraints for generating subsets, permutations, and combinations. Mastery of the recursive state and pruning is essential.",
        questions: [
            {
                title: "Combinations",
                difficulty: "Medium",
                points: 20,
                description: `Given two integers $n$ and $k$, return all possible combinations of $k$ numbers chosen from the range $[1, n]$.

Input:
n = 4, k = 2

Output:
[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`
            },
            {
                title: "Subsets II (with Duplicates)",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array 'nums' that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

Input:
nums = [1,2,2]

Output:
[[],[1],[1,2],[1,2,2],[2],[2,2]]`
            },
            {
                title: "Permutations II (with Duplicates)",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given a collection of numbers, 'nums', that might contain duplicates, return all possible unique permutations in any order.

Input:
nums = [1,1,2]

Output:
[[1,1,2],[1,2,1],[2,1,1]]`
            }
        ]
    },
    {
        title: "Two Pointers & Traversal Optimization",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-26",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "A dedicated event for the powerful **Two-Pointer** technique, used for linear-time traversal in sorted arrays, linked lists, and solving in-place modification problems. Focuses on array partition, three-sum, and container problems.",
        questions: [
            {
                title: "3Sum",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array 'nums', return all the triplets [nums[i], nums[j], nums[k]] such that $i \neq j$, $i \neq k$, and $j \neq k$, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets. Requires sorting and a two-pointer approach.

Input:
nums = [-1,0,1,2,-1,-4]

Output:
[[-1,-1,2],[-1,0,1]]`
            },
            {
                title: "Container With Most Water",
                difficulty: "Medium",
                points: 20,
                description: `You are given an integer array 'height' of length $n$. There are $n$ vertical lines drawn such that the two endpoints of the $i$-th line are $(i, 0)$ and $(i, height[i])$. Find two lines that together with the x-axis form a container, such that the container contains the most water. Solved using a converging two-pointer technique.

Input:
height = [1,8,6,2,5,4,8,3,7]

Output:
49`
            },
            {
                title: "Sort Colors (Dutch National Flag)",
                difficulty: "Medium",
                points: 20,
                description: `Given an array 'nums' with $n$ objects colored red, white, or blue (0, 1, and 2, respectively), sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. Uses a three-pointer in-place sorting algorithm (Dutch National Flag problem).

Input:
nums = [2,0,2,1,1,0]

Output:
[0,0,1,1,2,2]`
            }
        ]
    },
    {
        title: "Tree Traversals & Depth-First Search",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-27",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "A deep dive into tree structure processing using Depth-First Search (DFS) variants: Pre-order, In-order, Post-order. Emphasis on recursive vs. iterative implementations and problems requiring complex state tracking during traversal.",
        questions: [
            {
                title: "Binary Tree Inorder Traversal",
                difficulty: "Easy",
                points: 10,
                description: `Given the root of a binary tree, return the in-order traversal of its nodes' values. Implement both the recursive and iterative approach. 

[Image of binary tree inorder traversal]


Input:
root = [1,null,2,3]

Output:
[1,3,2]`
            },
            {
                title: "Maximum Depth of Binary Tree",
                difficulty: "Easy",
                points: 10,
                description: `Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Input:
root = [3,9,20,null,null,15,7]

Output:
3`
            },
            {
                title: "Path Sum III",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given the root of a binary tree and an integer 'targetSum', return the number of paths where the sum of the nodes' values equals 'targetSum'. The path does not need to start or end at the root or a leaf, but it must go downwards. Uses DFS with a path sum map.

Input:
root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8

Output:
3`
            }
        ]
    },
    {
        title: "Topological Sort & Dependencies",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-27",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focuses on graph problems that require determining a valid linear ordering based on dependencies (Topological Sort). Solved using either DFS (recursion stack) or Kahn's algorithm (BFS with in-degrees).",
        questions: [
            {
                title: "Course Schedule I (Kahn's Algorithm)",
                difficulty: "Medium",
                points: 20,
                description: `There are 'numCourses' courses you have to take, labeled from 0 to 'numCourses - 1'. You are given an array 'prerequisites' where prerequisites[i] = [a_i, b_i] indicates that you must take course $b_i$ first if you want to take course $a_i$. Return true if you can finish all courses, otherwise return false. Solved by detecting a cycle (or lack thereof) via Topological Sort.

Input:
numCourses = 2, prerequisites = [[1,0]]

Output:
true`
            },
            {
                title: "Course Schedule II (Order Output)",
                difficulty: "Medium",
                points: 25,
                description: `Return the ordering of courses you should take to finish all courses. If it's impossible to finish all courses, return an empty array.

Input:
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Output:
[0,1,2,3] or [0,2,1,3]`
            },
            {
                title: "Alien Dictionary",
                difficulty: "Hard",
                points: 40,
                description: `There is a new alien language that uses the English alphabet. Given a list of words from the alien language's dictionary, where the words are sorted lexicographically by the rules of this new language, return a string of the unique letters in the new language's sorted order. Requires building a graph of dependencies from adjacent words and then performing a Topological Sort.

Input:
words = ["wrt","wrf","er","ett","rftt"]

Output:
"wertf" or another valid order`
            }
        ]
    },
    {
        title: "Dynamic Programming: Knapsack & Subsets",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-27",
        startTime: "02:00 PM",
        duration: "3h",
        eventDescription:
            "Focuses on classic DP problems: the **Knapsack problem** (0/1 and unbounded) and **Subset Sum** variants. These require mastering the use of one or two-dimensional DP arrays to store intermediate optimal solutions.",
        questions: [
            {
                title: "Coin Change (Unbounded Knapsack)",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array of coins of different denominations and an integer 'amount', return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Input:
coins = [1,2,5], amount = 11

Output:
3

Explanation:
11 = 5 + 5 + 1`
            },
            {
                title: "Target Sum (Subset Count)",
                difficulty: "Medium-Hard",
                points: 30,
                description: `You are given an integer array 'nums' and an integer 'target'. You want to build an expression by adding one of the symbols '+' or '-' before each integer in 'nums' and then concatenating all the integers. Return the number of different expressions that you can build which evaluates to 'target'. This reduces to a subset sum problem.

Input:
nums = [1,1,1,1,1], target = 3

Output:
5`
            },
            {
                title: "Partition Equal Subset Sum (0/1 Knapsack)",
                difficulty: "Medium",
                points: 20,
                description: `Given a non-empty array 'nums' containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal. This is equivalent to checking if a subset sum exists for half the total sum.

Input:
nums = [1,5,11,5]

Output:
true

Explanation:
The array can be partitioned as [1, 5, 5] and [11].`
            }
        ]
    },
    {
        title: "Monotonic Stack/Queue & Window Applications",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-28",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "Advanced use of Monotonic Stacks (to find Next Greater/Smaller Element) and Monotonic Queues (for Sliding Window Maximum) to solve problems in optimal $O(n)$ time.",
        questions: [
            {
                title: "Next Greater Element II",
                difficulty: "Medium",
                points: 20,
                description: `Given a circular integer array 'nums' (i.e., the next element of nums[n-1] is nums[0]), return the next greater number for every element. The next greater number of a number $x$ is the first greater number to its traversing order next in the array, which means you could search circularly. Solved with a monotonic stack over a doubled array.

Input:
nums = [1,2,1]

Output:
[2,-1,2]`
            },
            {
                title: "Largest Rectangle in Histogram",
                difficulty: "Hard",
                points: 40,
                description: `Given an array of integers 'heights' representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram. The optimal $O(n)$ solution uses a monotonic stack to efficiently find the left and right boundary for each bar.

Input:
heights = [2,1,5,6,2,3]

Output:
10`
            },
            {
                title: "Subarray Minimums",
                difficulty: "Hard",
                points: 35,
                description: `Given an array of integers $A$, find the sum of $\text{min}(B)$, where $B$ ranges over every contiguous subarray of $A$. Since the answer may be large, return the answer modulo $10^9 + 7$. Solved by determining the contribution of each element as a minimum using two monotonic stacks (one for next smaller, one for previous smaller).

Input:
A = [3,1,2,4]

Output:
17`
            }
        ]
    },
    {
        title: "Data Structure Design Challenges",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-28",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focuses on designing custom data structures using combinations of existing ones (Hash Maps, Linked Lists, Heaps) to achieve specific time complexity goals, typically $O(1)$ for operations like retrieval and update.",
        questions: [
            {
                title: "Design HashMap",
                difficulty: "Easy",
                points: 10,
                description: `Implement a HashMap without using any built-in hash table libraries. This requires understanding the concept of buckets and handling collisions (e.g., with chaining).

Input:
MyHashMap(), put(1, 1), put(2, 2), get(1), get(3), put(2, 1), get(2), remove(2), get(2)

Output:
[null, null, null, 1, -1, null, 1, null, -1]`
            },
            {
                title: "LRU Cache",
                difficulty: "Medium-Hard",
                points: 40,
                description: `Design a Least Recently Used (LRU) cache. Implement the 'LRUCache' class with a fixed 'capacity', which supports 'get' (returns value of key, updates usage) and 'put' (inserts key-value, handles capacity, evicts LRU). Optimal solution uses a combination of a Hash Map and a Doubly Linked List for $O(1)$ operations.

Input:
LRUCache(2), put(1, 1), put(2, 2), get(1), put(3, 3), get(2), put(4, 4), get(1), get(3), get(4)

Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]`
            },
            {
                title: "Implement Magic Dictionary",
                difficulty: "Medium",
                points: 25,
                description: `Design a Magic Dictionary that supports an operation 'search' which checks if any word in the dictionary differs from the given search word by exactly one character. Solved efficiently by using a Hash Set or a Trie, focusing on one character replacement checks.

Input:
MagicDictionary(), buildDict(["hello", "leetcode"]), search("hello"), search("hhllo"), search("hell"), search("leetcoded")

Output:
[null, null, false, true, false, false]`
            }
        ]
    },
    {
        title: "Greedy Algorithms & Local Optimization",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-28",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "A specific event for problems where a locally optimal choice leads to a globally optimal solution. Topics include activity selection, coin change (canonical systems), and making maximum/minimum jumps.",
        questions: [
            {
                title: "Jump Game II",
                difficulty: "Hard",
                points: 30,
                description: `Given an array of non-negative integers 'nums' where 'nums[i]' is the maximum jump length from index $i$, return the minimum number of jumps to reach the last index. The optimal solution is a clever $O(n)$ greedy approach.

Input:
nums = [2,3,1,1,4]

Output:
2

Explanation:
Jump 1 step from 0 to 1, then 3 steps to the last index.`
            },
            {
                title: "Valid Mountain Array",
                difficulty: "Easy",
                points: 10,
                description: `Given an array 'arr', return true if and only if it is a valid mountain array. A mountain array has a strictly increasing portion followed by a strictly decreasing portion. Solved with a two-pointer or single-pass greedy traversal.

Input:
arr = [0,3,2,1]

Output:
true`
            },
            {
                title: "Best Time to Buy and Sell Stock (Multi-Transactions)",
                difficulty: "Medium",
                points: 20,
                description: `You are given an array 'prices' where prices[i] is the price of a given stock on the $i$-th day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times). This is a simple greedy problem.

Input:
prices = [7,1,5,3,6,4]

Output:
7

Explanation:
Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 3. Total profit = 4 + 3 = 7.`
            }
        ]
    },
    {
        title: "Advanced String Matching & Hashing",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-29",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "Advanced topics in string algorithms, including the KMP (Knuth-Morris-Pratt) algorithm for linear-time pattern matching and complex applications of hashing or string DP.",
        questions: [
            {
                title: "Longest Happy Prefix (KMP Preprocessing)",
                difficulty: "Medium",
                points: 25,
                description: `A string is called a "happy prefix" if it is a non-empty prefix which is also a suffix of the original string. Return the longest happy prefix of 's'. The optimal solution is to find the longest proper prefix that is also a suffix, which is the final value of the KMP 'LPS' array.

Input:
s = "abab"

Output:
"ab"`
            },
            {
                title: "Repeated String Match",
                difficulty: "Medium",
                points: 20,
                description: `Given two strings 'a' and 'b', return the minimum number of times you have to repeat string 'a' so that string 'b' is a substring of it. If it is impossible, return -1. Solved by intelligently checking a limited number of repetitions and using efficient substring search (e.g., string search or Rabin-Karp).

Input:
a = "abcd", b = "cdabcdab"

Output:
3

Explanation:
Repeating 'a' three times is "abcdabcdabcd", in which "cdabcdab" is a substring.`
            },
            {
                title: "Z-Algorithm Implementation",
                difficulty: "Hard",
                points: 40,
                description: `Implement the Z-Algorithm (an efficient string matching algorithm) to compute the Z-array for a given string 's'. The Z-array $Z[i]$ is the length of the longest substring starting at $s[i]$ that is also a prefix of $s$.

Input:
s = "aabaabaab"

Output:
[9,1,0,3,1,0,3,1,0]`
            }
        ]
    },
    {
        title: "Advanced Binary Search & Optimization",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-29",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focus on the advanced application of Binary Search on the 'answer' or 'result' (not just the index in an array) to solve optimization problems. This includes finding rates, capacity, or minimal/maximal bounds that satisfy a condition (monotonic property).",
        questions: [
            {
                title: "Search in Rotated Sorted Array (Recap)",
                difficulty: "Medium",
                points: 20,
                description: `(Recap) Search a target value in a rotated sorted array in $O(log n)$ time. Requires careful handling of the mid-point relative to the pivot.

Input:
nums = [4,5,6,7,0,1,2], target = 0

Output:
4`
            },
            {
                title: "Koko Eating Bananas",
                difficulty: "Medium",
                points: 25,
                description: `Koko loves to eat bananas. Given 'piles' (array of pile sizes) and 'h' (max hours), find the minimum integer eating speed $k$ such that Koko can eat all the bananas within $h$ hours. The solution space $[1, max(text{piles})]$ is binary searched.

Input:
piles = [3,6,7,11], h = 8

Output:
4`
            },
            {
                title: "Find the Duplicate Number",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given an array of $n + 1$ integers where each integer is between 1 and $n$ (inclusive), prove that at least one duplicate number must exist. Assume there is only one duplicate number, find the duplicate one. Solve without modifying the array and using only $O(1)$ extra space, either with binary search on the range or Floyd's slow/fast pointers.

Input:
nums = [1,3,4,2,2]

Output:
2`
            }
        ]
    },
    {
        title: "Minimum Spanning Trees & Graph Connectivity",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-29",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "Focuses on graph connectivity problems, specifically the construction of Minimum Spanning Trees (MST) using Prim's or Kruskal's algorithm, and the use of the **Union-Find (Disjoint Set Union)** data structure.",
        questions: [
            {
                title: "Minimum Spanning Tree (Recap)",
                difficulty: "Medium",
                points: 20,
                description: `Given a weighted undirected graph, find the total weight of MST using Kruskal's algorithm, which relies on the Union-Find data structure.

Input:
edges = [[0,1,1],[0,2,2],[1,2,3]], n = 3

Output:
3`
            },
            {
                title: "Connecting Cities With Minimum Cost",
                difficulty: "Medium",
                points: 25,
                description: `There are $N$ cities numbered from 1 to $N$. You are given an array 'connections' where connections[i] = [city1, city2, cost] represents the cost to connect city1 and city2. Return the minimum cost to connect all $N$ cities such that there is at least one path between any two cities. If it is impossible, return -1. A direct MST problem.

Input:
N = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]

Output:
6`
            },
            {
                title: "Number of Connected Components in an Undirected Graph",
                difficulty: "Medium",
                points: 20,
                description: `Given $n$ nodes labeled from 0 to $n-1$ and a list of undirected edges, write a function to find the number of connected components in the graph. Solved using DFS/BFS or the Union-Find data structure.

Input:
n = 5, edges = [[0,1],[1,2],[3,4]]

Output:
2`
            }
        ]
    },
    {
        title: "System Design: Scalable Data Structures",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-30",
        startTime: "09:00 AM",
        duration: "3h",
        eventDescription:
            "A mixed session combining a high-difficulty data structure design problem with a classic concurrency/multithreading scenario. Focuses on design patterns and handling concurrent state.",
        questions: [
            {
                title: "LFU Cache",
                difficulty: "Hard",
                points: 50,
                description: `Design a Least Frequently Used (LFU) cache. Implement the 'LFUCache' class with a fixed 'capacity', which supports 'get' (returns value, updates frequency) and 'put' (inserts key-value, handles capacity, evicts LFU). This requires a complex structure often involving multiple doubly linked lists and a frequency map.

Input:
LFUCache(2), put(1, 1), put(2, 2), get(1), put(3, 3), get(2), get(3), put(4, 4), get(1), get(3), get(4)

Output:
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]`
            },
            {
                title: "Design Hit Counter",
                difficulty: "Medium",
                points: 25,
                description: `Design a system that can count the number of hits received in the past 5 minutes (300 seconds). It must implement 'hit(timestamp)' and 'getHits(timestamp)' functions with efficient time complexity. Uses a queue or a fixed-size circular array to track hits.

Input:
HitCounter(), hit(1), hit(2), hit(3), getHits(4), hit(300), getHits(300), getHits(301)

Output:
[null, null, null, null, 3, null, 4, 3]`
            }
        ]
    },
    {
        title: "Math & Combinatorics (Advanced)",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-30",
        startTime: "12:00 PM",
        duration: "2h",
        eventDescription:
            "Focuses on combinatorial mathematics, number theory, and tricky math-based problems where the solution relies on an algebraic insight rather than complex data structures.",
        questions: [
            {
                title: "Reverse Pairs",
                difficulty: "Hard",
                points: 35,
                description: `Given an integer array 'nums', return the number of 'reverse pairs'. A reverse pair is a pair of indices $(i, j)$ such that $i < j$ and $\text{nums}[i] > 2 \times \text{nums}[j]$. Solved efficiently using Merge Sort or a specialized data structure like a Fenwick Tree/Segment Tree.

Input:
nums = [2,4,3,5,1]

Output:
3`
            },
            {
                title: "Factorial Trailing Zeroes",
                difficulty: "Easy",
                points: 10,
                description: `Given an integer $n$, return the number of trailing zeroes in $n!$ (n factorial). Requires a mathematical understanding of prime factorization (counting factors of 5).

Input:
n = 30

Output:
7`
            },
            {
                title: "Count Primes",
                difficulty: "Medium",
                points: 20,
                description: `Given an integer $n$, return the number of prime numbers that are strictly less than $n$. The most efficient solution uses the Sieve of Eratosthenes.

Input:
n = 10

Output:
4

Explanation:
There are 4 prime numbers less than 10: 2, 3, 5, 7.`
            }
        ]
    },
    {
        title: "Dynamic Programming on Trees",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-11-30",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "A specialized session for Tree Dynamic Programming (Tree DP). Problems involve propagating information (max/min values, sums, counts) up or down the tree structure using recursive calls and memoization.",
        questions: [
            {
                title: "House Robber III",
                difficulty: "Medium-Hard",
                points: 30,
                description: `The thief has found himself a new place for his thievery again. There is one major obstacle: the houses are arranged in a binary tree. It will automatically contact the police if two directly-linked houses were simultaneously broken into. Determine the maximum amount of money the thief can rob without alerting the police. Solved with Tree DP, calculating (rob, not rob) for each node.

Input:
root = [3,2,3,null,3,null,1]

Output:
7`
            },
            {
                title: "Diameter of Binary Tree",
                difficulty: "Medium",
                points: 20,
                description: `Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. Solved with a post-order traversal (DFS) where each node returns its height and updates a global maximum.

Input:
root = [1,2,3,4,5]

Output:
3

Explanation:
The path 4-2-1-3 or 5-2-1-3 is the longest path.`
            },
            {
                title: "Binary Tree Maximum Path Sum",
                difficulty: "Hard",
                points: 40,
                description: `A path in a binary tree is any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path does not need to pass through the root. Return the maximum path sum.

Input:
root = [1,2,3]

Output:
6`
            }
        ]
    },
    {
        title: "Advanced Graph: All Pairs Shortest Paths",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-01",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "Focus on algorithms that compute the shortest path between **all** pairs of nodes. This includes the Floyd-Warshall algorithm and repeated Dijkstra/Bellman-Ford runs. Problems often involve optimizing travel costs or connectivity.",
        questions: [
            {
                title: "Floyd-Warshall Implementation",
                difficulty: "Hard",
                points: 35,
                description: `Implement the Floyd-Warshall algorithm to find the shortest paths between all pairs of vertices in a weighted graph.

Input:
$N=4$, Edges: $(1,2,5), (1,3,10), (2,3,2)$

Output:
Shortest Path Matrix (e.g., $D[1][3]=7$)`
            },
            {
                title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
                difficulty: "Medium-Hard",
                points: 30,
                description: `There are $n$ cities. Given an array of edges, you are also given a 'distanceThreshold'. Find the city with the smallest number of reachable cities within 'distanceThreshold'. If there are multiple such cities, return the city with the largest label. Requires running an All-Pairs Shortest Path algorithm (like Floyd-Warshall or N-times Dijkstra).

Input:
n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4

Output:
3`
            },
            {
                title: "Cheapest Flights Within K Stops (Recap)",
                difficulty: "Hard",
                points: 30,
                description: `(Recap) Find cheapest flight from src to dst with $e K$ stops. This is a modified Shortest Path problem (often solved with a BFS/Bellman-Ford like DP approach or Dijkstra with state tracking).

Input:
$n = 3$, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, K = 1

Output:
200`
            }
        ]
    },
    {
        title: "Union-Find (DSU) Advanced Applications",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-01",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "A specialized event focusing on the **Disjoint Set Union (Union-Find)** data structure. Emphasis is on implementation optimization (Path Compression, Union by Rank/Size) and its use in connectivity, cycle detection, and grouping problems.",
        questions: [
            {
                title: "Number of Islands II",
                difficulty: "Hard",
                points: 40,
                description: `A 2D grid is initialized with all 0s. A list of coordinates 'positions' is given. Each position turns a '0' into a '1' (land). Return an array of the number of islands after each operation. The optimal solution uses the Union-Find data structure to track the number of connected components efficiently.

Input:
m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]

Output:
[1, 1, 2, 3]`
            },
            {
                title: "Redundant Connection II",
                difficulty: "Hard",
                points: 35,
                description: `In a directed graph, the root is an issue. Given a list of edges representing a tree with an additional edge (forming either a cycle or a node with two parents), find the single redundant edge that can be removed to make it a tree. Requires complex Union-Find logic to handle directed edges and the "two parents" case.

Input:
edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]

Output:
[4,1]`
            },
            {
                title: "Satisfiability of Equality Equations",
                difficulty: "Medium",
                points: 20,
                description: `Given an array of string equations like ["a==b", "b!=c", "c==a"], return true if it is possible to assign integer values to the variables so as to satisfy all the given equations. Solved by grouping equal variables with Union-Find, and then checking if any inequality contradicts a known equality.

Input:
equations = ["a==b","b!=a"]

Output:
false`
            }
        ]
    },
    {
        title: "BFS & Shortest Path on Graphs (0/1 Weights)",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-01",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "Focuses on shortest path problems where edge weights are either 0 or 1, allowing the use of a specialized BFS (0-1 BFS with a Deque) or an unweighted BFS which is faster than standard Dijkstra.",
        questions: [
            {
                title: "Shortest Path in Binary Matrix",
                difficulty: "Medium",
                points: 20,
                description: `Given an $n \times n$ binary matrix 'grid', return the length of the shortest clear path in the matrix. A clear path is a path from the top-left to the bottom-right that only goes through cells with 0s and is connected 8-directionally. Solved with standard BFS.

Input:
grid = [[0,1],[1,0]]

Output:
2`
            },
            {
                title: "Minesweeper",
                difficulty: "Medium",
                points: 25,
                description: `Let's play the minesweeper game. If a cell with 'M' is clicked, it becomes 'X'. If a cell with 'E' is clicked and it has adjacent mines, it becomes a number. If 'E' is clicked and has no adjacent mines, all 8 adjacent 'E' cells are revealed. Requires a specialized BFS/DFS to simulate the cascading effect.

Input:
board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]

Output:
... (The revealed board)`
            },
            {
                title: "Bus Routes",
                difficulty: "Hard",
                points: 40,
                description: `Given an array 'routes' where 'routes[i]' is a bus route that the $i$-th bus repeats forever. Also given a source stop 'source' and a target stop 'target'. Return the least number of buses you must take to reach the target from the source. This is a BFS on the graph of **routes**, not stops.

Input:
routes = [[1,2,7],[3,6,7]], source = 1, target = 6

Output:
2`
            }
        ]
    }
];

const eventsArray_final_batch = [
    {
        title: "DP: Longest Subsequences and Paths",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-02",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "This session tackles Dynamic Programming problems involving sequences, specifically focusing on the Longest Increasing Subsequence (LIS) variants, optimal subarray problems, and the use of binary search for DP optimization.",
        questions: [
            {
                title: "Longest Increasing Subsequence",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array 'nums', return the length of the longest strictly increasing subsequence. The classic DP solution is O(n²), but the optimized solution uses binary search to achieve O(n log n).

Input:
nums = [10,9,2,5,3,7,101,18]

Output:
4

Explanation:
The longest increasing subsequence is [2,3,7,18], hence the length is 4.`
            },
            {
                title: "Maximum Subarray",
                difficulty: "Easy",
                points: 10,
                description: `Given an integer array 'nums', find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. Solved using Kadane's algorithm.

Input:
nums = [-2,1,-3,4,-1,2,1,-5,4]

Output:
6

Explanation:
The subarray [4,-1,2,1] has the largest sum = 6.`
            },
            {
                title: "Number of Longest Increasing Subsequence",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given an integer array 'nums', return the number of longest increasing subsequences. This is an extension of LIS requiring two DP arrays: one for the length and one for the count.

Input:
nums = [1,3,5,4,7]

Output:
2

Explanation:
The two LIS are [1, 3, 5, 7] and [1, 3, 4, 7].`
            }
        ]
    },

    {
        title: "Advanced Tree Structures: Range Queries",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-02",
        startTime: "11:00 AM",
        duration: "3h",
        eventDescription:
            "This event introduces advanced tree-based data structures: Segment Trees and Fenwick Trees (Binary Indexed Trees). These are essential for efficiently handling range queries (sum, min, max) and point/range updates in logarithmic time.",
        questions: [
            {
                title: "Range Sum Query - Immutable (Segment Tree Implementation)",
                difficulty: "Medium",
                points: 30,
                description: `Design a data structure that supports a 'sumRange' query over a static array, returning the sum of elements between indices $i$ and $j$ inclusive. Implement this using a Segment Tree for logarithmic query time.

Input:
NumArray([-2, 0, 3, -5, 2, -1]), sumRange(0, 2), sumRange(2, 5), sumRange(0, 5)

Output:
1, -1, -3`
            },
            {
                title: "Range Sum Query - Mutable (Fenwick Tree)",
                difficulty: "Hard",
                points: 40,
                description: `Design a data structure that supports 'update' (modifying an element) and 'sumRange'. Implement this using a Fenwick Tree for efficient $O(log n)$ update and query times.

Input:
NumArray([1, 3, 5]), sumRange(0, 2), update(1, 2), sumRange(0, 2)

Output:
9, 8`
            },
            {
                title: "Count of Smaller Numbers After Self",
                difficulty: "Hard",
                points: 50,
                description: `Given an integer array 'nums', return an array 'counts' where 'counts[i]' is the number of elements to the right of 'nums[i]' that are strictly smaller than 'nums[i]'. This is solved by processing the array in reverse and using a Fenwick Tree or Segment Tree on the compressed value space.

Input:
nums = [5,2,6,1]

Output:
[2,1,1,0]`
            }
        ]
    },

    {
        title: "Object-Oriented Design and Concurrency",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-02",
        startTime: "02:00 PM",
        duration: "3h",
        eventDescription:
            "Focuses on implementing classes and systems that manage state and achieve efficient time complexity for specific operations. Questions involve advanced design patterns, complex state management, and handling parallel processes.",
        questions: [
            {
                title: "Design Twitter (Social Graph)",
                difficulty: "Hard",
                points: 40,
                description: `Design a simplified version of Twitter. Implement four primary API methods: postTweet, getNewsFeed, follow, and unfollow. The challenge is in efficiently merging feeds from multiple followed users and retrieving the 10 most recent tweets. Requires a graph structure for users and Heaps/Priority Queues for feed merging.

Input:
Twitter(), postTweet(1, 5), getNewsFeed(1), follow(1, 2), postTweet(2, 6), getNewsFeed(1), unfollow(1, 2), getNewsFeed(1)

Output:
... (Tweets and news feed lists)`
            },
            {
                title: "Design Skiplist",
                difficulty: "Hard",
                points: 45,
                description: `Design a Skiplist (a probabilistic data structure that allows $O(log n)$ average time complexity for search, insertion, and deletion) without using any built-in library methods. This tests understanding of advanced balanced structures.

Input:
Skiplist(), add(1), add(2), add(3), search(0), add(4), search(1), erase(0), erase(1), search(1)

Output:
... (Boolean results for operations)`
            },
            {
                title: "FizzBuzz Multithreaded",
                difficulty: "Medium",
                points: 25,
                description: `Write a program that outputs the sequence from 1 to $n$ but with concurrent execution rules: one thread calls 'fizz', one calls 'buzz', one calls 'fizzbuzz', and one calls 'number'. Requires using semaphores, mutexes, or condition variables to ensure synchronization and correct order.

Input:
n = 15

Output:
1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz`
            }
        ]
    },

    {
        title: "Graph Theory: Bipartite and Connectivity",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-03",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "A specialized graph session covering the concept of Bipartite graphs (two-coloring) and flow/connectivity problems often solved with Breadth-First Search on a state space.",
        questions: [
            {
                title: "Is Graph Bipartite?",
                difficulty: "Medium",
                points: 20,
                description: `Given an undirected graph, return true if and only if it is bipartite. A graph is bipartite if its nodes can be divided into two disjoint and independent sets $A$ and $B$ such that every edge connects a node in $A$ to one in $B$. Solved by attempting a two-coloring (BFS or DFS).

Input:
graph = [[1,3],[0,2],[1,3],[0,2]]

Output:
true`
            },
            {
                title: "Water and Jug Problem",
                difficulty: "Medium",
                points: 25,
                description: `Given two jugs with capacities $A$ and $B$, and a target amount $C$, determine if it is possible to measure exactly $C$ liters of water. Solved by recognizing that the problem is solvable if and only if $C$ is a multiple of text{GCD}(A, B)$ and $A+B  C$.

Input:
jug1Capacity = 3, jug2Capacity = 5, targetCapacity = 4

Output:
true`
            },
            {
                title: "Shortest Path to Get All Keys",
                difficulty: "Hard",
                points: 40,
                description: `We are given a 2D grid representing a maze. Find the shortest path to collect all keys. Keys 'a' through 'f' unlock doors 'A' through 'F'. This is a complex multi-state BFS problem where the state must track (row, column, collected keys bitmask).

Input:
grid = ["@.a.#","###.#","b.A.B"]

Output:
8`
            }
        ]
    },

    {
        title: "Backtracking: State Space Pruning",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-03",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focuses on refining the backtracking technique, particularly with constraint satisfaction problems like Sudoku, where efficient pruning (eliminating invalid branches early) is crucial for performance.",
        questions: [
            {
                title: "Sudoku Solver",
                difficulty: "Hard",
                points: 35,
                description: `Write a program to solve a Sudoku puzzle by filling the empty cells. The input board contains '9x9' partially filled cells. Requires a backtracking approach combined with efficient validity checks (row, column, 3x3 box).

Input:
board = [["5","3",...], ["6",".",...], ...]

Output:
... (The fully solved Sudoku board)`
            },
            {
                title: "Expression Add Operators",
                difficulty: "Hard",
                points: 40,
                description: `Given a string 'num' that contains only digits and an integer 'target', return all valid expressions that can be formed by inserting the binary operators '+', '-', or '*' between the digits of 'num' such that they evaluate to 'target'. This is a challenging backtracking problem due to operator precedence (*).

Input:
num = "123", target = 6

Output:
["1+2+3", "1*2*3"]`
            },
            {
                title: "Combination Sum III",
                difficulty: "Medium",
                points: 20,
                description: `Find all valid combinations of $k$ numbers that sum up to a number $n$ such that only numbers from 1 to 9 are used and each combination is a unique set of numbers.

Input:
k = 3, n = 7

Output:
[[1,2,4]]`
            }
        ]
    },

    {
        title: "Array and Pointer: Trapping Rain Water & Optimization",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-03",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "Explores complex array traversal problems, emphasizing the **two-pointer** technique for $O(n)$ time and $O(1)$ space solutions, particularly for problems involving finding boundaries or managing two ends of an array.",
        questions: [
            {
                title: "Trapping Rain Water",
                difficulty: "Hard",
                points: 40,
                description: `Given $n$ non-negative integers representing an elevation map where the width of each bar is 1, compute how much rainwater can be trapped after raining. The optimal solution uses a two-pointer approach to find the maximum boundaries in $O(n)$ time.

Input:
height = [0,1,0,2,1,0,1,3,2,1,2,1]

Output:
6`
            },
            {
                title: "Remove Duplicates from Sorted Array II",
                difficulty: "Medium",
                points: 25,
                description: `Given a sorted array 'nums', remove the duplicates in-place such that each element appears at most twice. The relative order of the elements should be kept the same. Requires a two-pointer approach to track the insertion index and count.

Input:
nums = [1,1,1,2,2,3]

Output:
5, with nums = [1,1,2,2,3,_]`
            },
            {
                title: "Rotate Array",
                difficulty: "Medium",
                points: 20,
                description: `Given an array, rotate the array to the right by $k$ steps, where $k$ is non-negative. Solve in-place with $O(1)$ extra space. The optimal solution uses three reversals.

Input:
nums = [1,2,3,4,5,6,7], k = 3

Output:
[5,6,7,1,2,3,4]`
            }
        ]
    },

    {
        title: "Advanced Intervals & Scheduling",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-04",
        startTime: "09:00 AM",
        duration: "2h",
        eventDescription:
            "A challenging event focusing on using greedy algorithms and specialized sorting for complex interval and scheduling problems, including minimizing costs and resolving overlaps.",
        questions: [
            {
                title: "Minimum Number of Arrows to Burst Balloons (Recap)",
                difficulty: "Hard",
                points: 30,
                description: `(Recap) Find the minimum number of arrows required to shoot through all balloons, where a balloon is represented as an interval $[x_{\text{start}}, x_{\text{end}}]$. An arrow shot at $x$ bursts all balloons whose intervals include $x$. Solved by a greedy strategy: sort by end time and find non-overlapping points.

Input:
points = [[10,16],[2,8],[1,6],[7,12]]

Output:
2`
            },
            {
                title: "Minimum Interval to Include Each Query",
                difficulty: "Hard",
                points: 40,
                description: `Given a list of intervals and a list of queries, for each query $q$, find the length of the smallest interval that contains $q$. If no such interval exists, the answer is -1. Requires sorting and using a Min-Heap to efficiently track valid intervals.

Input:
intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]

Output:
[2,2,1,4]`
            },
            {
                title: "Maximum CPU Load",
                difficulty: "Medium-Hard",
                points: 30,
                description: `Given a list of job intervals (start_time, end_time, cpu_load), find the maximum CPU load at any point in time. Solved by using a Min-Heap (or a line sweep approach) to track concurrent jobs and their loads.

Input:
jobs = [[1,4,3], [2,5,4], [7,9,6]]

Output:
7`
            }
        ]
    },

    {
        title: "Math: Computational Geometry & Line Sweeping",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-04",
        startTime: "11:00 AM",
        duration: "2h",
        eventDescription:
            "Focuses on problems requiring geometrical or mathematical insights. Topics include finding properties of points on a 2D plane, collision detection, and array problems solvable with a line-sweep algorithm.",
        questions: [
            {
                title: "Max Points on a Line",
                difficulty: "Hard",
                points: 40,
                description: `Given an array of points, return the maximum number of points that lie on the same straight line. Solved by iterating through pairs of points and using the slope/GCD to uniquely identify the line connecting them.

Input:
points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]

Output:
4`
            },
            {
                title: "Rectangle Overlap",
                difficulty: "Easy",
                points: 10,
                description: `Given two rectangles, each defined by its bottom-left and top-right coordinates, determine if they overlap. Requires a simple mathematical check for non-overlapping conditions.

Input:
rec1 = [0,0,2,2], rec2 = [1,1,3,3]

Output:
true`
            },
            {
                title: "Largest Time for Given Digits",
                difficulty: "Medium",
                points: 25,
                description: `Given an array of four digits, return the largest 24-hour time that can be formed using these digits. Return an empty string if no valid time can be formed. Solved by checking all 24 permutations and applying time constraints.

Input:
arr = [1,2,3,4]

Output:
"23:41"`
            }
        ]
    },

    {
        title: "Bit Manipulation: Masks & Advanced XOR",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-04",
        startTime: "02:00 PM",
        duration: "2h",
        eventDescription:
            "A session dedicated to advanced bit manipulation techniques, including using bitmasks to represent subsets or states, and complex applications of the XOR operator to find missing or unique numbers.",
        questions: [
            {
                title: "Single Number III",
                difficulty: "Medium",
                points: 25,
                description: `Given an integer array 'nums', in which exactly two elements appear once and all the other elements appear exactly twice. Find the two elements that appear only once. The solution uses XOR on all elements and then separates the two unique numbers based on a differentiating bit.

Input:
nums = [1,2,1,3,2,5]

Output:
[3,5] (or [5,3])`
            },
            {
                title: "Subsets (using Bitmask)",
                difficulty: "Medium",
                points: 20,
                description: `Given an integer array 'nums' of unique elements, return all possible subsets (the power set). Implement this using a bitmask, where each bit position corresponds to the inclusion or exclusion of an element.

Input:
nums = [1,2,3]

Output:
[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`
            },
            {
                title: "Maximum AND Sum",
                difficulty: "Hard",
                points: 40,
                description: `You are given an integer array 'nums' and an integer 'numSlots', which is the number of available slots. Find the maximum possible AND sum. The total number of elements in 'nums' is $2 \times \text{numSlots}$. This is a high-difficulty DP problem using a bitmask to represent the state of the slots (how many items are placed in each).

Input:
nums = [1,2,3,4,5,6], numSlots = 3

Output:
9`
            }
        ]
    },

    {
        title: "DP on Trees & Directed Acyclic Graphs (DAGs)",
        createdBy: "",
        createdBy_uid: "",
        date: "2025-12-04",
        startTime: "04:00 PM",
        duration: "2h",
        eventDescription:
            "Final session focusing on Dynamic Programming applied to tree structures (often recursive/DFS based) and DAGs (often using Topological Sort to ensure calculation order).",
        questions: [
            {
                title: "Longest Path in a Directed Acyclic Graph (DAG)",
                difficulty: "Medium",
                points: 25,
                description: `Given a weighted DAG, find the length of the longest path from a starting node. Solved by iterating over nodes in topological order (or using memoized DFS) to update the maximum path length.

Input:
edges = [[0,1,5],[0,2,3],[1,3,6],[2,3,7]], start = 0

Output:
10

Explanation:
Path 0→2→3 gives a total length of 3+7=10.`
            },
            {
                title: "Reconstruct Itinerary",
                difficulty: "Hard",
                points: 40,
                description: `Given a list of airline tickets, where 'tickets[i] = [from_i, to_i]' represents the departure and arrival airports of one flight. Find the itinerary that visits all airports exactly once. Start from "JFK". If there are multiple valid itineraries, choose the one that has the smallest lexical order. This is an Eulerian Path problem solved with Hierholzer's algorithm (DFS-based backtracking).

Input:
tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]

Output:
["JFK","MUC","LHR","SFO","SJC"]`
            },
            {
                title: "Maximum Product Subarray",
                difficulty: "Medium",
                points: 20,
                description: `Given an integer array 'nums', find a contiguous subarray (containing at least one number) which has the largest product and return the product. Requires tracking both the maximum and minimum product seen so far to handle negative numbers.

Input:
nums = [2,3,-2,4]

Output:
6

Explanation:
Subarray [2,3] has the largest product 6.`
            }
        ]
    }
];








const uploadEvents = async ({
    title= "",
    createdBy= '',
    createdBy_uid= '',
    date= '',
    startTime= "",
    eventDescription= '',
    questions= ''
}) => {
    try {
        const ref = collection(db, 'Events');

        await addDoc(ref, {
            title: title,
            createdBy: createdBy,
            createdBy_uid: createdBy_uid,
            date: date,
            startTime: startTime,
            hours: 2,
            minutes: 30,
            status: 'pending',
            description: eventDescription,
            questions: questions


        })


        return {
            success: true,
            message: 'Uploaded'
        }

    }  catch (error) {
        console.error(error);
    }
}



const fetch_All_Users_Information = async () => {
    try {
        const ref = collection(db, 'Students');
        const response = await getDocs(ref);

        const data = response.docs.map((doc) => ({
            id: doc.id,       // include doc id
            ...doc.data(),    // spread user fields
        }));

        return {
            success: true,
            message: '',
            data: data
        };

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message, data: [] };
    }
};

const showAllEvents = async () => {
    const uploadedEvents = []; // track uploaded event indices
    const uploadedUsers = []; // track users already picked

    const response = await fetch_All_Users_Information(); // { data: [...] }
    const users = response.data;

    while (uploadedEvents.length < eventsArray_final_batch.length) {
        // Pick a random user
        let randomUserIndex;
        do {
            randomUserIndex = Math.floor(Math.random() * users.length);
        } while (uploadedUsers.includes(randomUserIndex));

        uploadedUsers.push(randomUserIndex);
        const user = users[randomUserIndex];
        const createdBy_name = `${user.firstName} ${user.lastName}`;
        const createdBy_uid = user.id;

        // Assign 3 events to this user
        let eventsForUser = 0;
        while (eventsForUser < 3 && uploadedEvents.length < eventsArray_final_batch.length) {
            let randomEventIndex;
            do {
                randomEventIndex = Math.floor(Math.random() * eventsArray_final_batch.length);
            } while (uploadedEvents.includes(randomEventIndex));

            uploadedEvents.push(randomEventIndex);
            const event = eventsArray_final_batch[randomEventIndex];

            // Upload event with user as creator
            await uploadEvents({
                title: event.title,
                createdBy: createdBy_name,
                createdBy_uid: createdBy_uid,
                date: event.date,
                startTime: event.startTime,
                eventDescription: event.eventDescription,
                questions: event.questions
            });

            eventsForUser++;
        }
    }

    console.log("All uploads done!");
    console.log("Total users allocated:", uploadedUsers.length);
    console.log("Total events uploaded:", uploadedEvents.length);
};



showAllEvents().then(() => {
    console.log("All events done!");
});










