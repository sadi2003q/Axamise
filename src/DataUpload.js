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
