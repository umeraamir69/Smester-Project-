import Link from 'next/link'
import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux';
// import { admimloginSuccess, adminlogout } from '../../store/Action/adminAuth'
// import { useSelector } from 'react-redux';
import { BiCommentDetail } from 'react-icons/bi'
import { BsNewspaper } from 'react-icons/bs'
import { MdOutlineSell } from 'react-icons/md'
import { FcInspection } from 'react-icons/fc'
import { useRouter } from 'next/router';
import { IoExitOutline } from 'react-icons/io5'
import { MdWifiCalling1 } from 'react-icons/md'
import { FaFileInvoice } from 'react-icons/fa'


const Navbar = (props) => {
    const [show, setshow] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [showin, setshowin] = useState(false);
    const [sidebar, setsidebar] = useState(false)
    // const dispatch = useDispatch();
    const router = useRouter();
    // const isAuthenticated = useSelector((state) => state.adminAuth.adminIsAuthenticated);
    const isAuthenticated = true;
    // const data = useSelector((state) => state.adminAuth.adminUser);

    // useEffect(() => {
    //     const Verify = async () => {
    //         const request = await fetch('/api/Auth/ValidateAdmin', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ Token: localStorage.getItem("session") })
    //         })
    //         const output = await request.json()
    //         if (output.status) {
    //             dispatch(admimloginSuccess(output.error));
    //         }
    //         else {
    //             localStorage.clear("session")
    //             dispatch(adminlogout());
    //         }
    //     }
    //     if (!isAuthenticated && localStorage.getItem("session")) {
    //         Verify();
    //     }
    // }, [])

    const handleLogout = () => {
        setshowin(false)
        router.replace("/")
        localStorage.clear("session")
        // dispatch(adminlogout())
    }

    const handleLink = () => {
        setsidebar(!sidebar);
    }

    return (
        <div className=' print:hidden'>
            {isAuthenticated ?
                <>
                    <nav className="fixed top-0 z-50 w-full bg-white   border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start">

                                    <button onClick={() => setsidebar(!sidebar)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                        <span className="sr-only">Open sidebar</span>
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                        </svg>
                                    </button>

                                    <div className="flex ml-2 md:mr-24 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-16 h-12 dark:fill-gray-300 fill-black`} viewBox="0 0 1000.4 694.09" >
                                            <g id="layer2" fillRule="evenodd" >
                                                <path id="path3009" d="m322.7 508.64c-0.0149-0.00028-0.0297-0.006-0.0444-0.0169-0.0143-0.0106-0.0284-0.0263-0.0425-0.047-0.028-0.0411-0.0557-0.10176-0.0836-0.18206-0.0549-0.15844-0.11016-0.39253-0.16839-0.70172-0.11359-0.60305-0.23845-1.4888-0.39838-2.6488-0.30293-2.197-0.72569-5.3707-1.4918-9.4215-0.6787-3.5829-1.6182-7.8541-3.0682-12.665-1.4499-4.8112-3.4097-10.166-6.2221-15.79-2.4838-4.9679-5.6408-10.145-9.735-15.118 0-0.00001-0.00001-0.00001-0.00001-0.00002-3.903-4.7436-8.682-9.309-14.375-13.211-5.7959-3.98-12.575-7.2631-20.064-9.5736-8.2514-2.5498-17.376-3.8978-26.997-4.1614-9.3787-0.25069-19.233 1.1616-28.906 4.3572-8.8552 2.9195-17.579 7.3377-25.93 12.907-7.7071 5.1341-15.07 11.216-22.086 18.075-7.0158 6.8583-13.684 14.493-20.032 22.643-9.8137 12.63-18.813 26.56-26.93 41.488-2.4353 4.4795-4.7843 9.0372-7.0027 13.684-1.6758 2.2134-3.359 4.4341-5.0491 6.6617-19.401-4.0771-39.315-8.296-59.612-12.606 6.9362-4.8141 13.926-9.6698 20.964-14.556 1.2151-0.84361 2.4288-1.6862 3.6411-2.5276 6.978-3.808 13.715-7.813 19.99-12.261 5.7345-4.112 11.093-8.2706 14.884-13.292 2.4996-3.4039 4.8084-6.3902 5.5175-9.3856 0-0.00001 0.00001-0.00001 0.00001-0.00002 0.9045-2.6799 0.29477-6.0971-0.65453-9.6303-0.9381-3.0034-2.0246-5.7592-3.6174-7.8804-0.74388-0.96555-1.4394-1.7633-2.148-2.1783 0-0.00001 0-0.00001-0.00001-0.00001-0.58117-0.35874-1.2251-0.60001-1.7235-0.56758h-0.00001c-21.798-1.1514-42.913-2.248-63.178-3.2497 4.0161-16.108 9.7657-31.301 17.72-44.45 8.6916-12.278 19.395-22.215 30.679-29.987 7.3041-5.0246 14.764-9.217 22.151-12.851 7.3875-3.6344 14.703-6.7107 21.779-9.4395 11.415-4.4099 22.268-7.9776 32.359-11.044 10.091-3.0668 19.42-5.6306 27.851-7.873h0.00002c2.8167-0.74001 5.5492-1.1018 8.1602-1.2889 2.6111-0.18706 5.1009-0.19887 7.4476-0.17878 6.928 0.0338 12.981 0.53986 18.129 1.0735h0.00001c6.4652 0.66907 11.528 1.4363 15.101 2.0816 2.0124 0.36347 3.5527 0.69304 4.602 0.96877 0.55058 0.14467 0.96629 0.2747 1.2441 0.3878 0.14214 0.0578 0.24825 0.11123 0.31793 0.15995 0.0298 0.0637 0.0543 0.0975 0.0715 0.11528 0.0171 0.0177 0.027 0.0196 0.0278 0.0198h0.00002-0.00002c-0.00072-0.00008-0.0109-0.00088-0.032 0.0116-0.0213 0.0126-0.0539 0.0386-0.0997 0.0921-0.0799 0.0286-0.19584 0.0523-0.34743 0.0715-0.29684 0.0374-0.73023 0.0572-1.2977 0.0614-1.0814 0.008-2.6484-0.0405-4.6822-0.12645-3.6109-0.15263-8.6904-0.43726-15.121-0.63693h-0.00001c-5.1266-0.15859-11.107-0.29905-17.825 0.0158-2.3134 0.1161-4.7019 0.24528-7.109 0.52044s-4.8328 0.69577-7.2004 1.4533c0 0.00001 0 0.00001-0.00001 0.00001-8.3045 2.5917-17.487 5.4817-27.384 8.8385-9.8972 3.3568-20.509 7.178-31.603 11.789-6.8703 2.8605-13.928 6.0206-20.986 9.6731s-14.116 7.7971-20.929 12.69c-10.47 7.5094-20.321 16.938-28.16 28.382-8.5267 10.504-15.165 22.92-20.459 36.244 18.943-1.0017 38.571-2.0982 58.772-3.2497h0.00005c2.5791 0.0324 4.9853 0.77935 7.0031 2.0938 0.00001 0.00001 0.00003 0.00002 0.00004 0.00003 2.0134 1.3374 3.5827 2.9442 4.7596 4.6025 2.4726 3.4324 4.0717 7.1732 5.1382 10.82 1.4556 4.4442 2.11 9.6737 0.7664 15.107 0 0.00002-0.00001 0.00003-0.00001 0.00005-1.5665 5.2171-4.4277 9.3517-7.1603 12.781-4.8656 6.2834-10.938 11.157-16.999 15.399-6.7687 4.7904-13.9 9.0437-21.167 12.999-1.2895 0.38255-2.5806 0.76546-3.8733 1.1488-7.4876 2.2202-14.926 4.4233-22.308 6.6142 18.002 2.0734 35.673 4.1185 52.956 6.1555-0.0518-1.3148-0.10088-2.6274-0.14691-3.9379 2.3405-4.836 4.8053-9.5542 7.3502-14.167 8.4383-15.298 17.846-29.594 28.125-42.564 6.6259-8.3795 13.668-16.252 21.128-23.348 7.46-7.0954 15.338-13.413 23.602-18.772 8.9877-5.8215 18.478-10.409 28.165-13.426 10.614-3.3 21.391-4.6086 31.635-4.1167 10.185 0.4859 19.929 2.1939 28.784 5.1754 8.0519 2.7145 15.309 6.5142 21.492 11.05 6.0669 4.4574 11.054 9.5757 15.048 14.838 0 0.00001 0 0.00001 0.00001 0.00002 4.1828 5.5131 7.2916 11.145 9.6468 16.495 2.6615 6.0479 4.3906 11.728 5.5682 16.792 1.1776 5.0632 1.8031 9.5131 2.15 13.224 0.3933 4.1952 0.42106 7.4657 0.3192 9.7138-0.0538 1.1869-0.1457 2.0925-0.25091 2.7045-0.0539 0.31372-0.11148 0.55109-0.16975 0.71009-0.0295 0.0804-0.0592 0.14086-0.0887 0.18126-0.0149 0.0203-0.0297 0.0356-0.0444 0.0457-0.0152 0.0105-0.0302 0.0156-0.0451 0.0153z" />
                                                <path id="path3040" d="m434.32 251.61c0.007 0.0133 0.008 0.03 0.003 0.0502-0.009 0.0222-0.0267 0.0489-0.0522 0.08-0.0507 0.0619-0.13343 0.14152-0.24783 0.23863-0.22625 0.19206-0.57645 0.45267-1.0485 0.78086-0.92201 0.64105-2.3087 1.5399-4.1441 2.6894-3.4795 2.1793-8.5714 5.259-15.163 9.195-11.454 6.8395-27.447 16.247-47.313 28.104-14.678 8.7607-31.507 18.787-49.905 30.478-6.0165 3.8237-12.19 7.7973-18.351 12.128-2.0893 1.4694-4.1568 2.96-6.1434 4.5373-1.3108 1.0544-2.5234 2.0161-3.4395 3.0509-2.6364 2.9142-5.2745 5.728-7.462 8.7568-0.68678 0.96844-1.2882 1.8441-1.6464 2.682 0 0.00001-0.00001 0.00001-0.00001 0.00002-0.19704 0.60262-0.37977 0.94815-0.28812 0.97096-0.0499-0.15679-0.0169-0.16599-0.028-0.17077 0.12444 0.21319 0.66035 0.40617 1.4018 0.7549 2.764 1.1257 6.1357 1.4485 9.8081 1.9186 0.19568 0.0265 0.48594 0.029 0.8678 0.0392h0.00004c0.53736 0.009 1.1009-0.001 1.6906-0.0163h0.00003c1.7327-0.0452 3.5014-0.14702 5.3085-0.26113 5.6475-0.358 11.401-0.8581 17.267-1.3858 17.878-1.6092 36.579-3.5541 56.055-5.6105 49.338-5.2096 103.53-11.271 161.43-17.789 50.1-5.6404 102.97-11.647 157.85-17.91 17.013-1.9416 34.22-3.908 51.596-5.8986 4.7932-0.54911 9.5991-1.1 14.417-1.6532 1.2642-0.14514 2.5292-0.29043 3.795-0.43592h0.00001c0.32431-0.0373 0.64864-0.0746 0.97297-0.11187-0.17941 0.0654-0.35886 0.13091-0.53834 0.19637 0.0209-0.003 0.0419-0.005 0.0628-0.008 0.005-0.00064 0.0106-0.001 0.0159-0.002 8.0484-3.8455 16.43-6.9691 25.001-9.4771 3.172-0.92814 6.3598-1.7691 9.5554-2.5301 10.781-2.5889 21.757-4.3606 32.793-5.0197 31.021-1.8392 61.714 0.96642 90.855 7.426 11.372 2.5114 22.636 5.612 33.463 9.8589 3.9962 1.5644 7.9997 3.3299 11.881 5.4794 2.5634 1.3457 5.2868 3.0579 7.7562 5.4945 9.0806 5.5203 16.551 13.397 21.511 22.628 1.5747 2.8831 2.9243 5.9104 3.9844 9.0583 0.00001 0.00001 0.00001 0.00003 0.00002 0.00005 0.30038 0.8915 0.58175 1.8136 0.83134 2.7679v0.00001c0.0666 0.25444 0.13308 0.52259 0.1977 0.80477v0.00001c0.0289 0.14614 0.0589 0.29909 0.0896 0.45889 0.003 0.0145 0.006 0.0291 0.009 0.0437 0.001 0.005 0.002 0.0105 0.003 0.0157 1.8848 18.356 3.7362 36.377 5.553 54.03 2.6669 1.7314 5.3235 3.4588 7.9698 5.1822 2.5593 2.401 4.9379 5.1894 6.8321 8.4264v0.00005c1.9224 3.2877 3.082 7.2153 2.9513 11.401-0.6945 14.241-1.38 28.209-2.0555 41.887-0.1778 3.0321-0.9408 5.8129-1.976 8.2819-1.1759 2.86-2.6484 5.4726-4.2374 7.8802-3.5438 5.361-7.676 10.076-11.919 14.403-6.6865 4.4006-13.257 8.7552-19.708 13.062-0.074-0.0431-0.14815-0.0809-0.22226-0.11868-0.2147-0.11472-0.42941-0.22954-0.64412-0.34445-0.8429-0.45109-1.6857-0.90358-2.5284-1.3574-0.00002-0.00001-0.00005-0.00003-0.00007-0.00004 0.002-0.28329 0.002-0.57191 0.00039-0.8658-0.007-1.1168-0.0353-2.2408-0.0776-3.3715-0.15279-4.0851-0.48459-8.1418-0.95026-12.159-1.5153-12.988-4.4024-25.426-8.8676-36.811-2.7302-6.9615-6.0434-13.513-10.001-19.427-4.3023-6.4282-9.3652-12.119-15.039-16.743-6.4567-5.2745-13.738-9.1849-21.214-11.748-9.544-3.2855-19.423-4.4265-28.857-4.3873-10.054 0.0728-19.674 1.1694-28.436 3.2873-8.7618 2.1179-16.669 5.2542-23.553 9.2336-6.5091 3.7408-12.051 8.2079-16.687 12.88s-8.3688 9.5518-11.349 14.287c-3.3705 5.3445-5.8331 10.485-7.7058 15.119-1.8727 4.6339-3.1562 8.7654-4.1014 12.232-1.6204 8.223-2.6315 12.561-2.9563 12.538h-0.00001l-0.001-0.00011-0.001-0.00013h-0.00001c-0.32138-0.0441 0.0583-4.4506 1.0902-12.904 0.70192-3.5907 1.7591-7.891 3.4428-12.755 1.6837-4.8638 3.9944-10.296 7.2828-16.007 2.9133-5.0502 6.636-10.287 11.351-15.344 4.7146-5.0572 10.424-9.938 17.23-14.1 7.202-4.3808 15.481-7.9069 24.639-10.357 9.1588-2.4504 19.201-3.8221 29.667-4.0562 9.9508-0.25064 20.522 0.79818 30.995 4.181 8.2154 2.6641 16.257 6.8205 23.476 12.533 6.3199 5.012 11.949 11.139 16.702 18.057 4.3646 6.3516 8.0198 13.33 11.005 20.697 4.8722 12.024 8.0816 25.081 9.7935 38.634 0.53275 4.1937 0.92544 8.4547 1.1323 12.774 0.0573 1.1952 0.10022 2.4038 0.12011 3.6255 0.005 0.32142 0.009 0.6485 0.009 0.98128-0.00003-0.00001-0.00005-0.00002-0.00008-0.00002-0.84308-0.29551-1.6868-0.58961-2.5312-0.88231-0.2151-0.0746-0.43024-0.14902-0.64546-0.22339-0.0742-0.0275-0.14849-0.055-0.22275-0.0824 4.1622-5.272 8.3513-10.634 12.566-16.079 3.9121-4.0999 7.6021-8.3694 10.58-13.041 1.3541-2.1198 2.5532-4.2592 3.4153-6.4512 0.7283-1.9032 1.2656-3.7492 1.3025-5.462 0.5628-13.683 1.142-27.656 1.7367-41.901 0.1516-2.0507-0.6427-4.3442-1.8393-6.5243v-0.00003c-1.1671-2.1296-2.8821-4.0972-4.8448-5.9776-3.1221-2.6226-6.2598-5.2609-9.4131-7.9144-2.4698-18.477-4.999-37.379-7.58-56.663-0.001-0.006-0.002-0.0111-0.004-0.0165-0.003-0.0153-0.007-0.0306-0.0103-0.0459 0.006 0.0442 0.01 0.0818 0.0122 0.1127-0.0375-0.16144-0.0819-0.33497-0.13112-0.52099-0.18452-0.69688-0.40699-1.4086-0.65471-2.137-0.00001-0.00002-0.00002-0.00003-0.00002-0.00005-0.87372-2.5674-2.0139-5.0817-3.3554-7.5216-4.449-7.9424-11.114-14.82-19.071-19.666-1.6594-1.6753-3.9714-3.0734-6.5324-4.5634-3.3556-1.8551-6.9757-3.424-10.736-4.8933-10.189-3.9728-20.972-6.89-32.034-9.3175-28.329-6.1926-58.114-8.8674-88.147-7.0577-10.361 0.61969-20.756 2.3111-31.057 4.7776-3.1852 0.76909-6.3563 1.6101-9.505 2.53-8.5086 2.4859-16.781 5.5279-24.67 9.2335-0.0106 0.001-0.0158 0.002-0.0209 0.002-0.0206 0.002-0.0411 0.004-0.0617 0.007-0.34396 0.0843-0.68788 0.16868-1.0318 0.253-0.32472 0.0372-0.64934 0.0743-0.97386 0.11145h-0.00001c-1.2666 0.14488-2.5322 0.2895-3.797 0.4339-4.8202 0.55035-9.6278 1.0978-14.422 1.6426-17.382 1.9753-34.594 3.9173-51.614 5.826-54.901 6.1568-107.8 11.969-157.95 17.335-57.943 6.2018-112.21 11.844-161.64 16.546-19.505 1.8557-38.274 3.5894-56.243 4.9762-5.8878 0.45466-11.715 0.88309-17.479 1.1704-1.8382 0.092-3.698 0.17213-5.5778 0.19619h-0.00004c-0.63879 0.008-1.302 0.009-1.9886-0.01h-0.00004c-0.43711-0.009-0.96612-0.0344-1.5814-0.10904-3.6228-0.44038-7.5854-0.97224-11.498-2.515-1.1487-0.40674-2.476-1.1503-3.7609-2.3876-1.0708-1.0954-1.7314-2.5539-1.8681-4.2214-0.0114-1.7707 0.39066-3.1868 0.94132-4.206 0.00001-0.00002 0.00001-0.00003 0.00002-0.00005 0.71924-1.4992 1.5699-2.756 2.3994-3.8396 2.5818-3.4253 5.4111-6.3712 8.0666-9.1931 1.4199-1.4973 2.9066-2.6723 4.2787-3.7086 2.1693-1.6614 4.3605-3.1879 6.5212-4.6502 6.3774-4.3186 12.699-8.2284 18.814-11.951 18.72-11.398 35.807-21.063 50.731-29.429 20.206-11.327 36.538-20.16 48.339-26.395 6.7916-3.5881 12.086-6.3102 15.771-8.1238 1.9437-0.95662 3.4396-1.6604 4.4714-2.1044 0.52823-0.2273 0.93485-0.38652 1.2177-0.47671 0.14299-0.0456 0.25434-0.0735 0.33376-0.0837 0.0399-0.005 0.0718-0.006 0.0956-0.002 0.0199 0.006 0.0335 0.0162 0.0408 0.0294zm-386.46 194.38c-0.13778-1.0861 19.172-4.5569 52.024-9.5547 3.4087-0.51607 6.8387-0.78706 10.111-1.4392 2.9636-0.62522 5.8652-1.4638 8.0299-3.1217 32.838-23.745 77.349-55.301 127.76-90.505 12.851-8.9762 26.239-17.987 40.102-26.881 17.692-11.351 35.249-21.922 52.421-31.58 17.171-9.6582 33.957-18.404 50.075-26.185 21.473-10.371 41.799-19.033 60.188-25.933 18.389-6.9002 34.838-12.052 48.568-15.766 13.731-3.7143 24.74-6.0131 32.316-7.3119 7.5757-1.2989 11.715-1.6232 11.817-1.132 0.10227 0.4912-3.836 1.7638-11.161 3.9414-7.3253 2.1777-18.034 5.2857-31.407 9.7111s-29.408 10.19-47.37 17.583c-17.962 7.3936-37.849 16.428-58.941 27.041-15.826 7.9674-32.336 16.83-49.268 26.535-16.932 9.7054-34.288 20.254-51.837 31.514-13.75 8.8225-27.067 17.723-39.888 26.556-50.628 34.886-95.774 65.526-129.52 87.969-3.5505 2.3068-7.3328 3.332-10.807 3.8171-3.7909 0.56609-7.2773 0.68371-10.451 1.0027-33.058 3.3632-52.624 4.824-52.761 3.7379z" />
                                                <path id="path3044" d="m51.474 441.22c-0.01787-0.0114-0.02897-0.0335-0.03318-0.0664-0.004-0.0322-0.0013-0.0746 0.0085-0.12695 0.0197-0.10492 0.06798-0.25043 0.14627-0.43342h0.000001c0.15675-0.36639 0.43633-0.88706 0.85146-1.5399 0.83624-1.315 2.2348-3.1826 4.2842-5.4252 2.1223-2.322 4.933-5.0691 8.5266-8.0377s7.9787-6.1527 13.111-9.4018h0.000001c5.9215-3.7488 12.818-7.6393 20.716-11.429 7.8979-3.7898 16.799-7.4757 26.668-10.878 9.8691-3.4019 20.708-6.5172 32.392-9.2707 11.684-2.7536 24.214-5.1434 37.356-7.2352 41.805-6.7099 90.485-13.185 144.04-18.453 26.775-2.6341 54.766-4.9755 83.708-6.9639s58.835-3.6239 89.408-4.8892c26.612-1.1014 52.727-1.8831 78.165-2.4143 0.00001-0.00001 0.00003-0.00001 0.00004-0.00001 56.736-1.1857 110.11-1.1723 158.26-0.67028 48.144 0.50206 91.055 1.4866 126.87 2.5097s64.534 2.0912 84.298 3.0233c19.764 0.93211 30.572 1.7398 30.56 2.3601-0.0121 0.62034-10.844 1.0008-30.628 1.1654-19.784 0.16455-48.52 0.1017-84.335-0.047-35.815-0.14864-78.709-0.38944-126.8-0.31793-48.093 0.0715-101.38 0.46157-158 1.8412h-0.00004c-25.38 0.61891-51.432 1.4449-77.974 2.5436-30.494 1.2622-60.305 2.8325-89.168 4.6998-28.863 1.8672-56.778 4.0315-83.487 6.4389-53.418 4.8147-102.01 10.638-143.8 16.549-13.045 1.8617-25.45 3.9658-37.009 6.4012s-22.275 5.2001-32.045 8.2391c-9.7706 3.039-18.598 6.3497-26.464 9.7666-7.8657 3.4169-14.771 6.937-20.75 10.327-5.1744 2.9333-9.6173 5.7752-13.308 8.4169-3.6903 2.6418-6.6364 5.0771-8.9356 7.1166-2.22 1.969-3.8127 3.565-4.8821 4.6494-0.53087 0.53831-0.93097 0.94674-1.2171 1.2117h-0.000001c-0.14291 0.13232-0.25681 0.22786-0.34423 0.28557h-0.000001c-0.04379 0.029-0.08082 0.0482-0.11139 0.0577-0.03112 0.01-0.0557 0.009-0.07357-0.002z" />
                                                <path id="path3050" d="m223.26 339.78c-0.33093-0.60546 3.201-3.2844 9.8666-7.6181 6.6656-4.3338 16.461-10.33 28.694-17.52 12.232-7.1908 26.901-15.58 43.381-24.565 16.48-8.9853 34.774-18.562 54.301-28.003 2.9413-1.422 5.8689-2.8206 8.7801-4.1943 0-0.00001 0-0.00001 0.00001-0.00001 18.588-8.7819 36.58-16.568 53.168-22.892 16.587-6.3244 31.765-11.19 44.633-14.654 12.868-3.4642 23.42-5.5526 30.76-6.638 7.3405-1.0854 11.462-1.2069 11.591-0.55553 0.1289 0.65139-3.7398 2.0152-10.755 4.2125-7.0152 2.1974-17.169 5.2674-29.593 9.5347-12.425 4.2673-27.117 9.7575-43.285 16.5-16.169 6.7426-33.814 14.741-52.242 23.511-0.00001 0-0.00001 0.00001-0.00001 0.00001-2.8828 1.3736-5.7852 2.7667-8.7047 4.1778-19.382 9.368-37.699 18.643-54.351 27.148-16.652 8.5053-31.641 16.235-44.295 22.625-12.654 6.3895-22.97 11.441-30.212 14.726-7.2417 3.285-11.405 4.8105-11.736 4.205z" />
                                                <path id="path3054" d="m39.406 455.16c-3.564-0.1-6.204 5.14-7.5 8.46-2.738 7.02-2.59 15.43 0 22.5 1.369 3.74 3.524 8.61 7.5 8.44l66.594-2.81c11.56-0.49 11.56-34.39 0-34.72l-66.594-1.87z" />
                                                <path id="path3058" d="m41.275 518.96c0.03398-0.91745 2.5954-1.6792 6.8725-2.2019 4.2771-0.52266 10.268-0.80569 17.358-0.82007 6.212-3.2641 13.502-6.3966 21.353-9.7055-0.08078 0.009-0.1616 0.0178-0.24246 0.0267-6.8918 0.75969-13.424 1.4648-19.373 1.9686-5.9485 0.50382-11.313 0.8053-15.841 0.85107-4.5278 0.0458-8.2187-0.16415-10.788-0.58187-2.5693-0.41771-4.0168-1.0422-4.0294-1.732-0.01254-0.68989 1.4153-1.3666 4.0446-1.8788 2.6293-0.51224 6.4605-0.85893 11.226-0.98213 4.7656-0.12319 10.466-0.0229 16.801 0.25758 6.3357 0.28048 13.307 0.74007 20.586 1.2421 0.08541 0.006 0.17076 0.0118 0.25606 0.0177-7.8876 6.9554-15.341 13.439-21.798 18.437-8.0632-0.57559-14.736-1.3276-19.335-2.179-4.5987-0.85139-7.125-1.8016-7.091-2.719z" />
                                                <path id="path3067" d="m926.61 353.02c0.44886-0.13229 1.0261 0.2516 1.7398 1.0291 0.71373 0.7775 1.5679 1.9492 2.6281 3.3783 2.1203 2.8582 5.0948 6.7894 9.4329 10.321 2.0592 1.7062 4.4389 3.3384 7.1142 4.846s5.646 2.8918 8.8104 4.1442c0.006 0.003 0.013 0.005 0.0195 0.008 4.9581 1.9634 9.8894 3.3796 14.494 4.5372 4.6047 1.1576 8.8766 2.0614 12.497 2.8937 3.6206 0.83233 6.5878 1.5912 8.6282 2.3344 2.0404 0.74311 3.157 1.4663 3.115 2.155-0.042 0.68872-1.2366 1.2798-3.3826 1.7349-2.146 0.45507-5.2464 0.77819-9.0967 0.83108-3.8503 0.0529-8.455-0.16524-13.544-0.92292-5.0895-0.75767-10.666-2.0632-16.343-4.2466-0.007-0.003-0.0149-0.006-0.0223-0.009-3.6726-1.4157-7.1409-3.1873-10.236-5.228-3.0956-2.0406-5.8168-4.349-8.0786-6.7712-2.3885-2.5886-4.1796-5.2638-5.4813-7.7576-1.3018-2.4938-2.1175-4.8058-2.5903-6.7519-0.47277-1.9461-0.6062-3.5272-0.52523-4.6387 0.081-1.1116 0.37307-1.7549 0.82193-1.8872z" />
                                                <path id="path3075" d="m316.14 442.32c-0.0833-2.7587 106.5-8.2166 237.92-12.183 131.41-3.9662 238.13-4.9461 238.22-2.1874 0.0833 2.7587-106.5 8.2166-237.92 12.183-131.41 3.9662-238.13 4.9461-238.22 2.1874z" />
                                            </g>
                                        </svg>

                                        <span className="self-center text-xl font-semibold sm:text-2xl ml-3 whitespace-nowrap dark:text-white">                                            <div className='flex'>
                                            <div className='text-red-500 '>Dawood</div>
                                            <div className='ml-1 dark:text-gray-50'>Motors</div>
                                        </div> </span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center ml-3">
                                        <div>
                                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { setshowin(!showin) }}>
                                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-800">
                                                    <span className="font-medium  text-gray-600 dark:text-white capitalize"> umer</span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className={`${showin ? "fixed" : "hidden"} top-10 right-10  z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} >
                                            <div className="px-4 py-3" role="none">
                                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                   
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 w-28" >
                                                   
                                                </p>
                                            </div>
                                            <ul className="py-1" role="none">
                                                <li>
                                                    <Link href="/Dashboard/Main" onClick={() => setshowin(!showin)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Dashboard</Link>
                                                </li>

                                                <li>
                                                    <div onClick={handleLogout} className="block cursor-pointer bg-red-700 px-4 py-2 text-sm hover:bg-red-900 text-red-200  " >Sign out</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <aside className={`fixed top-0   ${sidebar ? "left-64 md:left-0" : "hidden"}  z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"`}>
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link href="/Dashboard/Main" onClick={handleLink} >
                                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Dashboard</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => setshow(!show)} type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Postings</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul className={`${show ? "" : "hidden"} py-2 space-y-2`}>
                                        <li>
                                            <Link href="/Dashboard/Car" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Cars</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Dashboard/Blogs" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Blog</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button onClick={() => setshow2(!show2)} type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Users</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul className={`${show2 ? "" : "hidden"} py-2 space-y-2`}>
                                        <li>
                                            <Link href="/Dashboard/User" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Users</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Dashboard/Admin" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Admin</div>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Complain" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Complaint&apos;s</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Testimonials" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <BiCommentDetail className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Testimonials</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/PurchaseCarRequest" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <MdOutlineSell className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Seller Request</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Newsletter" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <BsNewspaper className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Newsletter</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => setshow3(!show3)} type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <FcInspection className='w-6 h-6' />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Inspection</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <ul className={`${show3 ? "" : "hidden"} py-2 space-y-2`}>
                                        <li>
                                            <Link href="/Dashboard/InspectionRequest" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Inspection Request</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Dashboard/Inspection" onClick={handleLink} >
                                                <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Inspection</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="/Dashboard/CallRequest" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLink} >
                                        <MdWifiCalling1 className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Call Request</span>
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Dashboard/Invoice" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLink} >
                                        <FaFileInvoice className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Invoice</span>
                                    </Link>
                                </li>


                                <li>
                                    <div onClick={handleLogout} className="flex items-center p-2 text-red-100 bg-red-700 rounded-lg  cursor-pointer hover:bg-red-500 ">
                                        <IoExitOutline className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </>

                :
                ""
            }
        </div >
    )
}

export default Navbar