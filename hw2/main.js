const people_info = [
    {pic: "./JoshAndGirls/RaKuten15.png", name: "你"},
    {pic: "./JoshAndGirls/RaKuten16.png", name: "YURI"},
    {pic: "./JoshAndGirls/RaKuten22.png", name: "菲菲"},
    {pic: "./JoshAndGirls/RaKuten28.png", name: "倪暄"},
    {pic: "./JoshAndGirls/RaKuten51.png", name: "籃籃"},
    {pic: "./JoshAndGirls/RaKuten95.png", name: "林襄"}
]

main_attendee = people_info[0]
who_are_attendees = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
initial_attendees_quantity = 6
attendee_quantity = 0

// 做出一個與會者
function make_one_attendee(attendee) {
    attendee_quantity++
    // 右邊其他與會者的視窗
    let othersWindow = document.getElementById("others")

    // 與會者框框
    let person = document.createElement('div')
    person.className = "person"
    // person.id = "others"
    othersWindow.appendChild(person)

    // 組合刪除和靜音按鈕
    let above = document.createElement('div')
    above.className = "above"
    person.appendChild(above)

    // 刪除與會者按鈕
    let drop = document.createElement('img')
    drop.src = "./function/x.png"
    drop.className = "delete"
    above.appendChild(drop)

    // 靜音
    let mute = document.createElement('img')
    mute.src ="./function/mute.png"
    mute.className = "mute_icon"
    above.appendChild(mute)

    //主要大頭貼 & 功能按鈕
    let attendee_pic = document.createElement('div')
    attendee_pic.className = "attendee_picture"
    person.appendChild(attendee_pic)
    
    //主要大頭貼
    let photo = document.createElement('img')
    photo.src = attendee.pic
    photo.className = "photo"
    attendee_pic.appendChild(photo)
    
    // 功能按鈕
    let function_button_for_others = document.createElement('div')
    function_button_for_others.className = "function_button_for_others"
    attendee_pic.appendChild(function_button_for_others)

    function_icon = ["./function/pin_others.PNG", "./function/mute_others.PNG", "./function/remove_others.PNG"]
   
    for (let i = 0; i < function_icon.length; i++) {
        let f = document.createElement('img');
        function_button_for_others.appendChild(f)
        f.src = function_icon[i]
        f.className = "function_for_others"
    }

    let name = document.createElement('div')
    name.innerText = attendee.name
    name.className = "name"
    person.appendChild(name)

    if (name.innerText === "你") {
        drop.style.visibility = "hidden"
    }

    // 刪除與會者
    drop.addEventListener('click', function(){
        person.remove()
        attendee_quantity--
        console.log(attendee_quantity)

        // 剩自己時，成為主畫面，並填滿整個視窗
        mainWindow = document.getElementById("person_you")
        // 有人被釘選的情況
        if (othersWindow.className === "others"){
            if (attendee_quantity === 0){
                othersWindow.style.display = "none"

                mainWindow.classList.remove("you")
                mainWindow.classList.add("new_you")
            }
        }
        // 無人被釘選，要讓主畫面變100%
        else{
            if (attendee_quantity === 1) {
                mainWindow.style.display = "flex"

                // 被點選的人換到主畫面
                document.getElementById("person_you").childNodes[1].childNodes[0].src = people_info[0].pic
                document.getElementById("person_you").childNodes[2].childNodes[1].innerText = people_info[0].name

                othersWindow.style.display = "none"

                mainWindow.classList.remove("you")
                mainWindow.classList.add("new_you")
            }
        }
    })

    // 釘選以換成主要與會者
    function_button_for_others.addEventListener('click', function(){
        // 取得要被釘選的與會者資料
        need_pin_photo = function_button_for_others.parentElement.childNodes[0].src
        need_pin_name = function_button_for_others.parentElement.parentElement.childNodes[2].innerText

        // 有人被釘選的情況
        if (othersWindow.className === "others"){
            // 取得主畫面與會者資料
            out_pin_photo = document.getElementById("person_you").childNodes[1].childNodes[0].src
            out_pin_name = document.getElementById("person_you").childNodes[2].childNodes[1].innerText
            
            // 交換
            // 主畫面的人換到這格
            function_button_for_others.parentElement.childNodes[0].src = out_pin_photo
            function_button_for_others.parentElement.parentElement.childNodes[2].innerText = out_pin_name
            
            // 被點選的人換到主畫面
            document.getElementById("person_you").childNodes[1].childNodes[0].src = need_pin_photo
            document.getElementById("person_you").childNodes[2].childNodes[1].innerText = need_pin_name

            // 如果主畫面原本是你，交換過來之後刪除與會者鍵要消失
            if (out_pin_name === "你") {
                function_button_for_others.parentElement.parentElement.childNodes[0].childNodes[0].style.visibility = "hidden"
            }
            // 如果是你要重新被釘選，其他與會者交換回來之後，刪除鍵要重新顯示
            if (need_pin_name=== "你") {
                function_button_for_others.parentElement.parentElement.childNodes[0].childNodes[0].style.visibility = "visible"
            }
        }

        // 無人被釘選，要讓被點擊的人成為釘選的主畫面
        else{
            mainWindow = document.getElementById("person_you")
            mainWindow.style.display = "flex"
            
            othersWindow.classList.remove("new_others")
            othersWindow.classList.add("others")

            // 被點選的人換到主畫面
            document.getElementById("person_you").childNodes[1].childNodes[0].src = need_pin_photo
            document.getElementById("person_you").childNodes[2].childNodes[1].innerText = need_pin_name

            person.remove()
        }
    })
}

// 做出主要與會者
function make_main_attendee(attendee) {
    // 建立視窗
    let mainWindow = document.getElementById("person_you")
    
    // 靜音
    let mute = document.createElement('img')
    mute.src = "./function/mute.png"
    mute.className = "mute_top_right"
    mainWindow.appendChild(mute)

    //主要大頭貼 & 功能按鈕
    let main_pic = document.createElement('div')
    main_pic.className = "main_picture"
    mainWindow.appendChild(main_pic)
    
    //主要大頭貼
    let photo = document.createElement('img')
    photo.src = attendee.pic
    photo.className = "photo_you"
    main_pic.appendChild(photo)

    // 功能按鈕
    let function_button = document.createElement('div')
    function_button.className = "function_button"
    main_pic.appendChild(function_button)

    function_icon = ["./function/no_pin.PNG", "./function/pic.PNG", "./function/arrow.PNG"]
   
    for (let i = 0; i < function_icon.length; i++) {
        let f = document.createElement('img');
        function_button.appendChild(f)
        f.src = function_icon[i]
        f.className = "function"
    }

    //釘選符號 & 名字
    let name = document.createElement('div')
    name.className = "name"
    mainWindow.appendChild(name)
    
    let pin_you = document.createElement('img') 
    pin_you.src = "./function/pin.png"
    pin_you.id = "pin_you"
    name.appendChild(pin_you)

    let name_you = document.createElement('div')
    name_you.innerText = attendee.name
    name_you.id = "name_you"
    name.appendChild(name_you)

    // 取消釘選，與會者平均分配畫面
    function_button.addEventListener('click', function(){
        pin_photo = function_button.parentElement.childNodes[0].src
        pin_name = function_button.parentElement.parentElement.childNodes[2].innerText
        pin_person = [{pic: pin_photo, name: pin_name}]
        make_one_attendee(pin_person[0])
        
        mainWindow.style.display = "none"
        let othersWindow = document.getElementById("others")
        othersWindow.classList.remove("others")
        othersWindow.classList.add("new_others")
    })
}

// 做出所有與會者
function make_all_attendees(who_are_attendees, people_info) {
    for (let i = 0; i < who_are_attendees.length; i++) {
        if (who_are_attendees[i] === 1) {
            make_one_attendee(people_info[i])
        }
    }
}

// 執行 make_all_attendees
make_all_attendees(who_are_attendees, people_info)

// 做出主要與會者
make_main_attendee(people_info[0])