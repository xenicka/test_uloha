*** Settings ***
Library    SeleniumLibrary


*** Variables ***
${URL}    http://localhost:8080/sk/
${submit}   xpath=//button[@type="submit"]
${NAME}  Olena
${EDIT_BTN_ID}  xpath=//button[normalize-space(.)="Upraviť"]
${UPDATED_NAME}  OlenaChangedHerName
${NEW_PARAMETER_NAME}   newParam 
${NEW_PARAMETER_VALUE}      newParamValue

*** Test Cases ***

Open Localhost Web App
    Open Browser    ${URL}    chrome
    Click Button  css=button.btn.action-button.me-2
    Input Text  name=name  ${NAME}
    Input Text  name=email  olena@gmail.com
    Select From List By Value  name=role  user
    Click Button   ${submit}
    Sleep    2s
    Click Element   xpath=//tr[td[normalize-space(.)="${NAME}"]]//button[normalize-space(.)="✏️"]
    Wait Until Element Is Visible    name=name    timeout=10s
    Input Text  name=name   ${UPDATED_NAME}
    Click Button   ${EDIT_BTN_ID}
    Sleep  2s
    Click Element   xpath=//tr[td[normalize-space(.)="${UPDATED_NAME}"]]//a[normalize-space(.)="📋"]
    Wait Until Page Contains    Školenie (Java-Springboot)    timeout=10s
    Click Element   xpath=//td//button[normalize-space(.)="➕"]
    Input Text  name=name   ${NEW_PARAMETER_NAME}
    Input Text  name=email   ${NEW_PARAMETER_VALUE}
    Click Button   ${submit}

    Close Browser

    