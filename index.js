// Variables
const sendBtn = document.getElementById("send-btn")
let requestedServices = []
const offeredServices = [
    {
        btnId: "wash-car-btn",
        taskId: "wash-car",
        task: "Wash Car", 
        price: 10
    },
    {
        btnId: "maw-lawn-btn", 
        taskId: "maw-lawn",
        task: "Maw Lawn", 
        price: 20
    },
    {
        btnId: "pull-weeds-btn",
        taskId: "pull-weed",
        task: "Pull Weed", 
        price: 30
    },
    {
        btnId: "clean-pool-btn",
        taskId: "clean-pool",
        task: "Clean Pool", 
        price: 50
    }
]

// =============
addServiceBtn()

for (let i = 0; i < offeredServices.length; i++) {
    const service = offeredServices[i]
    const serviceBtn = document.getElementById(service.btnId)
    
    serviceBtn.addEventListener("click", function() {
        addService(service)
    })
}

sendBtn.addEventListener("click", sendInvoice)

//Functions
function addServiceBtn() {
    const btnSection = document.getElementById("btn-section")
    let outputHtml = ""

    for (let i = 0; i < offeredServices.length; i++) {
        let service = offeredServices[i]

        outputHtml += `
            <button id="${service.btnId}" class="service-btn">
                ${service.task}: $${service.price}
            </button>
        `
    }
    btnSection.innerHTML = outputHtml
}

function addService(service) {
    if (!requestedServices.includes(service)) {
        requestedServices.push(service)
        
        renderInvoice()
    }
}

function renderInvoice() {
    const totalAmount = document.getElementById("total-amount")
    const taskOutputContainer = document.getElementById("task-output-container")
    let totalCost = 0
    let outputHtml = ""

    for (let i = 0; i < requestedServices.length; i++) {
        const service = requestedServices[i]

        outputHtml += generateHtml(service.taskId, service.task, service.price)
        totalCost += service.price
        }
        
    taskOutputContainer.innerHTML = outputHtml
    totalAmount.innerText = totalCost

    addRemoveBtn()
}

function generateHtml(taskId, task, price) {
    return `
    <div class="container-flex">
        <p class="task">
            ${task} 
            <button id="remove-${taskId}" class="remove-btn">
                Remove
            </button>
        </p>
        <p class="price">
            <span class="usd">$</span>
            ${price}
        </p>
    </div>
    `
}

function addRemoveBtn() {
    for (i = 0; i < requestedServices.length; i++) {
        const service = requestedServices[i]
        const removeBtn = document.getElementById("remove-" + service.taskId)

        removeBtn.addEventListener("click", function() {
            removeService(service)
        })
    }
}

function removeService(service) {
        // get the index position of an object in the list
        const serviceIndex = requestedServices.indexOf(service)
        // removes the object from the requested services Array at the given index 
        requestedServices.splice(serviceIndex, 1)
        renderInvoice()
}

function sendInvoice() {
    requestedServices = []
    renderInvoice(requestedServices)
}