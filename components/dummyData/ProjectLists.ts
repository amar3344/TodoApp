export interface PLInterface {
    id: string,
    projectName: string,
    tasks: PTasks[]
}[]

export interface PTasks {
    name: string,
    status: string,
}

export const ProjectsLists: PLInterface[] = [
    {
        id: Date.now()+"1",
        projectName: "Lesser refer and earn",
        tasks: [
            {
                name: "Signup/Login Screens",
                status: "yet to start",
            },
            {
                name: "App Navigation",
                status: "progress",
            },
            {
                name: "Profile Section",
                status: "completed",
            },
            {
                name: "Add Scannar to the app",
                status: "yet to start",
            },

        ]
    },
    {
        id: Date.now()+"2",
        projectName: "Real-Estate",
        tasks: [
            {
                name: "Dashboard screen with api integration",
                status: "yet to start",
            },
            {
                name: "Update user location screen",
                status: "yet to start",
            },
            {
                name: "Chat screen",
                status: "yet to start",
            },
        ]
    },
    {
        id: Date.now()+"3",
        projectName: "Gigchasers",
        tasks: [
            {
                name: "Assign Gig to deployer screen",
                status: "yet to start",
            },
            {
                name: "Assign Gig to deployee screen",
                status: "yet to start",
            },
            {
                name: "Couter-Offer screen",
                status: "yet to start",
            },
            {
                name: "Paymet gateway with strip payment",
                status: "completed",
            },
            {
                name: "Counter offer screens between both deployee and deployer",
                status: "progress",
            },
            {
                name: "Live tracking of deployee sceen",
                status: "yet to start",
            },
        ]
    },
    {
        id: Date.now()+"4",
        projectName: "Offspace",
        tasks: [
            {
                name: "Develope templates screens",
                status: "progress",
            },
            {
                name: "Integrated with third party api integration",
                status: "yet to start",
            },
        ]
    },
]