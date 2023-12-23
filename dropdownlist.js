function distanceToBottom(e) {
    const rect = e.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const distance = windowHeight - rect.bottom;
    return distance;
}

function getHeightOfHiddenElement(element) {
    const clonedElement = element.cloneNode(true);
    clonedElement.style.cssText = 'position: absolute; visibility: hidden; display: block !important;';
    document.body.appendChild(clonedElement);
    const height = clonedElement.offsetHeight;
    document.body.removeChild(clonedElement);
    return height;
}

function eventListenerCategory(idx) {
    const CategorySelectBox = document.querySelector(`.category-select-box[idx="${idx}"]`);
    const CategorySelectOption = document.querySelector(`.category-select-box[idx="${idx}"] .category-select-option`);
    const CategorySelectContent = document.querySelector(`.category-select-box[idx="${idx}"] .category-select-content`);
    const CategoryShowValue = document.querySelector(`.category-select-box[idx="${idx}"] .category-select-option .category-input`);
    const CategoryKeyword = document.querySelector(`.category-select-box[idx="${idx}"] .category-select-content .category-keyword`);
    const CategoryOptions = document.querySelector(`.category-select-box[idx="${idx}"] .category-select-content .category-options`);
    const CategoryOptionsList = document.querySelectorAll(`.category-select-box[idx="${idx}"] li`);

    // resize the content
    function resizeSelectContentWidth() {
        const optionWidth = CategorySelectOption.offsetWidth;
        CategorySelectContent.style.width = `${optionWidth}px`;
    }
    window.addEventListener('resize', resizeSelectContentWidth);
    resizeSelectContentWidth();

    // reposition on scroll
    function repositionSelectContent() {
        const scrollTop = document.scrollTop;
        const translateYValue = scrollTop + 'px';
        CategorySelectContent.style.transform = `translateY(-${translateYValue})`;
    }
    document.addEventListener('scroll', function () {
        var height = getHeightOfHiddenElement(CategorySelectContent)
        if (CategorySelectBox.classList.contains('active-select') || CategorySelectBox.classList.contains('active-select-reverse')) {
            if (distanceToBottom(CategorySelectBox) < (height + 20)) {
                CategorySelectBox.classList.add('active-select-reverse');
                CategorySelectContent.style.marginTop = '-' + (height + 55) + 'px'
                CategorySelectBox.classList.remove('active-select');
            }
            else {
                CategorySelectBox.classList.add('active-select');
                CategorySelectContent.style.marginTop = '0px'
                CategorySelectBox.classList.remove('active-select-reverse');
            }
            repositionSelectContent();
        }
    });
    repositionSelectContent();

    // show onclick
    CategorySelectOption.addEventListener('click', function () {
        // close other list before open the selected list
        const allList = document.querySelectorAll('.select-box');
        allList.forEach(function (dropdown) {
            if (dropdown !== CategorySelectBox && (dropdown.classList.contains('active-select') || dropdown.classList.contains('active-select-reverse'))) {
                dropdown.classList.remove('active-select');
                dropdown.classList.remove('active-select-reverse');
            }
        });

        // active the selected list
        var distance = distanceToBottom(CategorySelectBox)
        if (CategorySelectBox.classList.contains('active-select-reverse')) {
            CategorySelectBox.classList.remove('active-select-reverse');
        }
        else if (CategorySelectBox.classList.contains('active-select')) {
            CategorySelectBox.classList.remove('active-select');
        }
        else {
            // to hide the option that have been selected 
            // const selectedItem = document.querySelectorAll('.category-select-box .category-select-option .category-input');
            // const valuesArray = Array.from(selectedItem).map(item => item.value);
            // for (var i = 0; i < CategoryOptionsList.length; i++) {
            //     if (valuesArray.includes(CategoryOptionsList[i].innerText)) {
            //         CategoryOptionsList[i].style.display = 'none'
            //     }
            //     else {
            //         CategoryOptionsList[i].style.display = 'list-item'
            //     }
            // }

            repositionSelectContent();
            resizeSelectContentWidth();
            var height = getHeightOfHiddenElement(CategorySelectContent)
            if (distance < (height + 20)) {
                CategorySelectBox.classList.add('active-select-reverse');
                CategorySelectContent.style.marginTop = '-' + (height + 55) + 'px'
            }
            else {
                CategorySelectBox.classList.add('active-select');
                CategorySelectContent.style.marginTop = '0px'
            }
            CategoryKeyword.focus()
        }
    });

    // li onclick
    CategoryOptionsList.forEach(function (optionsListSingle) {
        optionsListSingle.addEventListener('click', function () {
            const text = optionsListSingle.textContent;

            CategoryShowValue.value = text;

            // Close select content after selecting an option
            CategorySelectBox.classList.remove('active-select');
            CategorySelectBox.classList.remove('active-select-reverse');
        });
    })

    // search
    CategoryKeyword.addEventListener('keyup', function () {
        var filter, li, i, textValue
        filter = CategoryKeyword.value.toUpperCase()
        li = CategoryOptions.getElementsByTagName('li')

        for (i = 0; i < li.length; i++) {
            liCount = li[i];
            textValue = liCount.textContent || liCount.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            }
            else {
                li[i].style.display = 'none';
            }
        }
    })

    // Close dropdown list if not clicked on it
    document.addEventListener('click', function (event) {
        if (!CategorySelectBox.contains(event.target)) {
            CategorySelectBox.classList.remove('active-select');
            CategorySelectBox.classList.remove('active-select-reverse');
        }
    });

    // Prevent clicks on the dropdown from closing the dropdown
    CategorySelectBox.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

function eventListenerStudent(idx) {
    const StudentSelectBox = document.querySelector(`.student-select-box[idx="${idx}"]`);
    const StudentSelectOption = document.querySelector(`.student-select-box[idx="${idx}"] .student-select-option`);
    const StudentSelectContent = document.querySelector(`.student-select-box[idx="${idx}"] .student-select-content`)
    const StudentValue = document.querySelector(`.student-select-box[idx="${idx}"] .student-select-1`);
    const StudentShowValue = document.querySelector(`.student-select-box[idx="${idx}"] .student-select-2`);
    const StudentKeyword = document.querySelector(`.student-select-box[idx="${idx}"] .student-keyword`);
    const StudentOptions = document.querySelector(`.student-select-box[idx="${idx}"] .student-options`);
    const StudentOptionsList = document.querySelectorAll(`.student-select-box[idx="${idx}"] li`);

    // resize the content
    function resizeSelectContentWidth() {
        const optionWidth = StudentSelectOption.offsetWidth;
        StudentSelectContent.style.width = `${optionWidth}px`;
    }
    window.addEventListener('resize', resizeSelectContentWidth);
    resizeSelectContentWidth();

    // reposition on scroll
    function repositionSelectContent() {
        const scrollTop = document.scrollTop;
        const translateYValue = scrollTop + 'px';
        StudentSelectContent.style.transform = `translateY(-${translateYValue})`;
    }
    document.addEventListener('scroll', function () {
        var height = getHeightOfHiddenElement(StudentSelectContent)
        if (StudentSelectBox.classList.contains('active-select') || StudentSelectBox.classList.contains('active-select-reverse')) {
            if (distanceToBottom(StudentSelectBox) < (height + 20)) {
                StudentSelectBox.classList.add('active-select-reverse');
                StudentSelectContent.style.marginTop = '-' + (height + 55) + 'px'
                StudentSelectBox.classList.remove('active-select');
            }
            else {
                StudentSelectBox.classList.add('active-select');
                StudentSelectContent.style.marginTop = '0px'
                StudentSelectBox.classList.remove('active-select-reverse');
            }
            repositionSelectContent();
        }
    });
    repositionSelectContent();

    // show onclick
    StudentSelectOption.addEventListener('click', function () {
        // close other list before open the selected list
        const allList = document.querySelectorAll('.select-box');
        allList.forEach(function (dropdown) {
            if (dropdown !== StudentSelectBox && (dropdown.classList.contains('active-select') || dropdown.classList.contains('active-select-reverse'))) {
                dropdown.classList.remove('active-select');
                dropdown.classList.remove('active-select-reverse');
            }
        });

        // active the selected list
        var distance = distanceToBottom(StudentSelectBox)
        if (StudentSelectBox.classList.contains('active-select-reverse')) {
            StudentSelectBox.classList.remove('active-select-reverse');
        }
        else if (StudentSelectBox.classList.contains('active-select')) {
            StudentSelectBox.classList.remove('active-select');
        }
        else {
            repositionSelectContent();
            resizeSelectContentWidth();
            var height = getHeightOfHiddenElement(StudentSelectContent)
            if (distance < (height + 20)) {
                StudentSelectBox.classList.add('active-select-reverse');
                StudentSelectContent.style.marginTop = '-' + (height + 55) + 'px'
            }
            else {
                StudentSelectBox.classList.add('active-select');
                StudentSelectContent.style.marginTop = '0px'
            }
            StudentKeyword.focus()
        }
    });

    // li onclick
    StudentOptionsList.forEach(function (optionsListSingle) {
        optionsListSingle.addEventListener('click', function () {
            const text = optionsListSingle.textContent.trim();
            const spanText = optionsListSingle.querySelector('span').textContent.trim();

            StudentShowValue.value = text.slice(0, -5);
            StudentValue.value = spanText;

            // Close select content after selecting an option
            StudentSelectBox.classList.remove('active-select');
            StudentSelectBox.classList.remove('active-select-reverse');
        });
    })

    // search
    StudentKeyword.addEventListener('keyup', function () {
        var filter, li, i, textValue
        filter = StudentKeyword.value.toUpperCase()
        li = StudentOptions.getElementsByTagName('li')

        for (i = 0; i < li.length; i++) {
            liCount = li[i];
            textValue = liCount.textContent || liCount.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            }
            else {
                li[i].style.display = 'none';
            }
        }
    })

    // Close dropdown list if not clicked on it
    document.addEventListener('click', function (event) {
        if (!StudentSelectBox.contains(event.target)) {
            StudentSelectBox.classList.remove('active-select');
            StudentSelectBox.classList.remove('active-select-reverse');
        }
    });

    // Prevent clicks on the dropdown from closing the dropdown
    StudentSelectBox.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

// add event listener to the drop down list
document.addEventListener('DOMContentLoaded', function () {
    const idx = 0
    eventListenerCategory(idx)
    eventListenerStudent(idx)
});

// on load scroll to center
window.onload = function () {
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var scrollToCenter = (document.body.scrollHeight - viewportHeight) / 2;

    window.scrollTo({
        top: scrollToCenter,
        behavior: 'smooth'
    });
};

// example output
function showResult() {
    const p = document.querySelector('#result');
    const category = document.querySelector(`.category-select-box[idx="0"] .category-select-option .category-input`);
    const studentName = document.querySelector(`.student-select-box[idx="0"] .student-select-2`);
    const studentID = document.querySelector(`.student-select-box[idx="0"] .student-select-1`);
    p.innerText = "Category: " + category.value + "\nStudent ID: " + studentID.value + "\nStudent Name: " + studentName.value;
}