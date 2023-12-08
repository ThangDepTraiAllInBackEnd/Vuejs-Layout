$(document).ready(function () {
    new SearchPage();
});

class SearchPage {
    constructor() {
        this.optionList = [
            "Nam", "Nữ", "Khác"
        ];
        this.resultList = [];
        this.index = -1;
        this.searchElement = $('#search-field');
        this.result = $('#search-field').val();
        this.dropContainer = $('#dropdown-container');
        this.inputBtnElement = $('.input-btn')
        this.resultContainer = $('<div>').attr('id', 'result-container');
        this.textFiled = $('.m-textfield-combobox');
        this.initEvents();
    };

    /**
     * listen all event 
     */
    initEvents() {
        const page = this;
        try {
            // onclick drop btn
            this.handleClickDrop(page.inputBtnElement);
            // on focus to input filed
            page.searchElement.off('focus').on('focus', function () {
                page.searchElement.off('keyup');
                // search on input
                page.handleKeyup();
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * listen key up event and handle event base keycode of button
     */
    handleKeyup() {
        const page = this;
        page.searchElement.on('keyup', function (e) {
            const keyCode = e.keyCode || e.which;
            page.dropContainer.html('');
            page.result = $('#search-field').val();
            // nothing in input field
            if (page.result === '') {
                page.resultContainer.css('display', 'none');
                page.searchElement.attr('title', '');
            } else {
                page.resultList = page.filterResult(page.searchElement.val());
                page.searchElement.attr('title', '');
                // data > 0 
                if (page.resultList.length > 0) {
                    page.resultContainer.css('display', '');
                    page.changeBorderColor(true, page.textFiled, page.inputBtnElement);
                    // result container doesn't exist -> append data                       
                    page.dropContainer.append(page.resultContainer);
                    if (keyCode !== 40 && keyCode !== 38) {
                        page.index = - 1;
                    }
                    page.handleUsingKey(page.resultContainer, page.resultList, keyCode);
                } else {
                    page.changeBorderColor(false, page.textFiled, page.inputBtnElement);
                    page.searchElement.attr('title', 'Dữ liệu không tồn tại trong hệ thống');
                    page.resultContainer.css('display', 'none');
                }
            }
        });
    }


    /**
     * Change border color when result found or not found 
     * @param {*} isFound Status to annouce found nor not
     * @param {*} textFiled To change color border  
     * @param {*} inputBtnElement To change color border
     */
    changeBorderColor(isFound, textFiled, inputBtnElement) {
        const page = this;
        if (isFound) {
            textFiled.css('border', '1px solid #e6e6e6');
            inputBtnElement.css('border-left', '1px solid #e6e6e6')
        } else {
            textFiled.css('border', '1px solid red');
            inputBtnElement.css('border-left', '1px solid red');
        }
    }



    /**
     * Search all element and find element contain keyword
     * @param {*} keyword User's keyword to find
     * @returns An array's element contain keyword
     */
    filterResult(keyword) {
        return this.optionList.filter(function (brand) {
            return brand.toLowerCase().includes(keyword.toLowerCase());
        })
    }

    /**
     * Append all result into list and display to screen -> can listen user onlick into item
     * @param {*} ResultContainer Container include result all result
     * @param {*} resultList List to display to screen
     * @param {*} itemId Id to check which item is checked -> add class checked in to item
     * @param {*} action Action base user click or press enter button
     */
    displayResult(resultContainer, resultList, itemId, action) {
        const page = this;
        resultContainer.html('');
        for (let i = 0; i < resultList.length; i++) {
            const resultItem = $('<div>').addClass('result-item');
            resultItem.attr('id', resultList[i]);
            resultItem.addClass('item-hover');
            const resultIcon = $('<div>').addClass('result-icon');
            const resultText = $('<div>').addClass('result-text').append(`<li>${resultList[i]}</li>`);
            resultItem.append(resultIcon, resultText);
            resultContainer.append(resultItem);
            if (resultList[i] === itemId) {
                $(resultItem).addClass('result-item-checked');
                $(resultItem).removeClass('item-hover');
                $(resultIcon).html('<i class="fa-solid fa-check"></i>');
            }
        }
        if (action !== 'enter') {
            // user onclick item
            $('.result-item').on('click', function () {
                page.handleClickItem(this, resultContainer, 'click');
            });
            return resultContainer;
        } else {
            page.searchElement.off('keyup');
            // page.handleKeyup();
        }
        $('.result-item').on('click', function () {
            page.handleClickItem(this, resultContainer, 'click');
        });
    }


    /**
     * Change color and add icon checked to the left of the item
     * @param {*} checkedItem Item that user choosed
     * @param {*} resultContainer Hide result container after click item
     */
    handleClickItem(checkedItem, resultContainer, action) {
        $('*').removeClass('fa-check');
        $('*').removeClass('result-item-checked');
        let resultIconClass = $(checkedItem).find('.result-icon');
        let resultTextClass = $(checkedItem).find('.result-text');
        $(resultIconClass).html('<i class="fa-solid fa-check"></i>');
        $(checkedItem).addClass('result-item-checked');
        $(checkedItem).removeClass('item-hover');
        this.result = $(resultTextClass).text();
        this.searchElement.val($(resultTextClass).text());
        resultContainer.css('display', 'none');
        // checked item again afer hide container and display all item
        this.displayResult(resultContainer, this.optionList, checkedItem.id, action);
    }

    /**
     * handle when drop btn click, dislay none/block when click
     * @param {*} dropBtn 
     */
    handleClickDrop(dropBtn) {
        const page = this;
        dropBtn.on('click', function () {
            page.resultContainer.toggle();
        });
    }

    /**
     * handle event base user'btn
     * @param {*} resultContainer Container contain all result ( result items )
     * @param {*} resultList List of result string
     * @param {*} keyCode Button's keycode from user
     * @returns A resultContainer contain all result
     */
    handleUsingKey(resultContainer, resultList, keyCode) {
        resultContainer = this.displayResult(resultContainer, resultList, '', 'click');
        const page = this;
        switch (keyCode) {
            // key up
            case 38:
                if (page.index !== 0) {
                    page.index--;
                    page.moveFocusElement(page.index, resultContainer);
                } else {
                    page.index = 0;
                    page.moveFocusElement(page.index, resultContainer);
                }
                break;
            // Key down
            case 40:
                if (page.index < parseInt(resultList.length) - 1) {
                    page.index++;
                    page.moveFocusElement(page.index, resultContainer);
                    // 
                } else {
                    page.index = parseInt(resultList.length) - 1
                    page.moveFocusElement(page.index, resultContainer);
                }
                break;
            default:
                return;
        }

    }



    /**
     * change focus element by change background color ( add class )
     * @param {*} index Item's index focusing
     * @param {*} resultContainer Find result element in resultContainer
     */
    moveFocusElement(index, resultContainer) {
        const page = this;
        const checkedElement = resultContainer.children().eq(index);
        const parentElement = $(`#${checkedElement.text()}`)[0];
        parentElement.classList.add('is-item-focus');

        $(document).off('keydown');
        $(document).keydown(function (event) {
            // press enter
            if (event.which === 13) {
                event.preventDefault();
                parentElement.classList.remove('is-item-focus');
                page.handleClickItem(parentElement, resultContainer, 'enter');
            }
        });
    }



}