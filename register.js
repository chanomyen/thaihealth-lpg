const isOtherWorkTypeCheckbox = document.getElementById("otherWorkType");
const otherWorkTypeInput = document.getElementById("otherWorkTypeValue");
var lineProfile;
isOtherWorkTypeCheckbox.addEventListener('change', () => {
    if (isOtherWorkTypeCheckbox.checked) {
        otherWorkTypeInput.disabled = false;
    } else {
        otherWorkTypeInput.disabled = true;
    }
});

const submitBtn = document.getElementById("submitBtn");
submitBtn.disabled = true;
const userRegisterForm = document.querySelector('form');
userRegisterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isOtherWorkType = document.getElementById("otherWorkType").checked;

    let otherWorkTypeValue = "";
    if (isOtherWorkType) {
        otherWorkTypeValue = document.getElementById("otherWorkTypeValue").value;
    }

    const data = new FormData(userRegisterForm); // create a FormData object from the form inputs
    const formDataObject = Object.fromEntries(data);

    // formDataObject.homeAddress = document.getElementById("homeAddress").value;

    formDataObject.cutStone = Number(document.getElementById("cutStone").checked);
    formDataObject.drilling = Number(document.getElementById("drilling").checked);
    formDataObject.carveStone = Number(document.getElementById("carveStone").checked);
    formDataObject.otherWorkType = otherWorkTypeValue;

    // formDataObject.lineId = lineProfile.userId;
    // formDataObject.lineName = lineProfile.displayName;
    formDataObject.lineId = "";
    formDataObject.lineName = "";

    console.log(formDataObject)
    const json = JSON.stringify(formDataObject); // convert the FormData object to a JSON string

    submitBtn.innerHTML = "กำลังส่งข้อมูล...";
    submitBtn.disabled = true;
    submitBtn.className = "btn btn-info btn-lg";
    const url = "https://asia-southeast1-thai-health-x.cloudfunctions.net/apiLampang/lpg/user"
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(response => {
            console.log('Success:', response);
            submitBtn.innerHTML = "เสร็จสิ้น";
            submitBtn.className = "btn btn-success btn-lg";
            // goToAssessmentPage();
            // handle the successful response from the server here
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.innerHTML = "ล้มเหลว";
            submitBtn.className = "btn btn-danger btn-lg";
            // handle any errors that occur during the request here
        });
});

const policyCheckbox = document.getElementById("policyCheckbox");
policyCheckbox.addEventListener('change', () => {
    if (policyCheckbox.checked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

// const burlBtn = document.getElementById("burl");
// burlBtn.addEventListener("click", () => {
//     // console.log(document.getElementById("homeAddress").value);

//     submitBtn.innerHTML = "กำลังส่งข้อมูล...";
// });

function loadLIFF() {
    if (!window.LIFF) {
        const liffScript = document.createElement('script');
        liffScript.setAttribute('src', 'https://static.line-scdn.net/liff/edge/2.1/sdk.js');
        liffScript.setAttribute('charset', 'utf-8');
        document.body.appendChild(liffScript);
    }
}

async function isRegisted(userId) {
    const url = `https://asia-southeast1-thai-health-x.cloudfunctions.net/apiLampang/lpg/user/?userId=${userId}`
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        });
}

function goToAssessmentPage() {
    let baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (baseUrl.includes("github")) {
        baseUrl = `${baseUrl}/thaihealth-lpg`;
    }
    const nextPage = `${baseUrl}/silicosis-risk-prediction.html`;
    console.log(nextPage);
    window.location.replace(nextPage);
}

window.onload = async function () {
    // console.log("On load!!!")
    // loadLIFF();
    // await liff.init({ liffId: "2000015305-b6e21554" });
    // if (liff.isLoggedIn()) {
    //     console.log("Logged In!");
    // } else {
    //     console.log("Not logged In!");
    //     liff.login();
    // }

    // const profile = await liff.getProfile();
    // lineProfile = profile;
    // console.log(lineProfile);
    // isRegisted(lineProfile.userId)
    //     .then(data => {
    //         console.log(data.exists);
    //         if (data.exists) {
    //             console.log("Go to next!");
    //             goToAssessmentPage();
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Error");
    //         console.error(error)
    //     });
};