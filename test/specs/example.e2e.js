

//Inspired by https://github.com/Georgegriff/query-selector-shadow-dom/blob/master/examples/webdriverio/deeply-nested.js
const { locatorStrategy } = require('query-selector-shadow-dom/plugins/webdriverio');

describe('hybrid app test', () => {
	it('test', () => {

        driver.addLocatorStrategy('shadow', locatorStrategy);
        
        expect(driver.custom$('shadow', '#shadow2p')).toHaveTextContaining(
            'I am a shadow2');
    	

        //Only chrome & android
        //browser.custom$('shadow', '#shadow2input').setValue("i am an input")
        //expect(browser.custom$('shadow', '#shadow2input')).toHaveValue('i am an input');

    	
        browser.execute(() => {
        	document.querySelector('#shroot').shadowRoot.querySelector('#shadow1div').shadowRoot.querySelector('#shadow2input').value = 'javascript injection'
        })
		expect(browser.custom$('shadow', '#shadow2input')).toHaveValue('javascript injection');



        
 

		//Everywhere (to be tested on IOS)
        browser.execute((el, input) => {el.value = input},
        	browser.custom$('shadow', '#shadow2input'), 'i am a scripted input')

        expect(browser.custom$('shadow', '#shadow2input')).toHaveValue('i am a scripted input');

        
        //Only web
		//browser.execute((el) => {el.select()},// or focus()
        //	browser.custom$('shadow', '#shadow2input'))
		
		//browser.keys('test with keyboard')
		
		//for (let c of 'test with keyboard') {
  		//	browser.keys(c)
		//}
		
		//expect(browser.custom$('shadow', '#shadow2input')).toHaveValue('test with keyboard');
        

        browser.execute((el) => {el.click()},
        	browser.custom$('shadow', '#shadow2submit'))
        driver.acceptAlert();

	});

});


