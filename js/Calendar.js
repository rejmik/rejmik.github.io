/**
 * @author Tomas Borkovec
 */
class Calendar {

    /**
     * Kontruktor tridy Calendar
     * @param {2Darray} events 
     */
    constructor(events = []) {
        this.events = events;
        this.date = new Date();
        this.numberMonth = 0;
    }

    /**
     * Metoda vrati prvni den v danem mesici
     * @param {int} year 
     * @param {int} month_number 
     * @returns {array[]} pole, ktere ma na prvnim pozici zkratku prvniho dne v cestine a na druhe pozici cislo dne cislovane od 0
     * 
     * 
     */
    firstAndLastDaysInMonth(year, month_number) {

        var firstDay = String(new Date(year, month_number, 1));
        var lastDay = String(new Date(year, month_number + 1, 0));

        var firstDayArray = firstDay.split(" "); // 0: DayLetter, 1: Month, 2: DayNumber, 3: Year, ... 
        // var lastDayArray = lastDay.split(" "); / / 0: DayLetter, 1: Month, 2: DayNumber, 3: Year, ...

        var vysledek;

        switch (String(firstDayArray[0])) {
            case "Mon":
                vysledek = ["Po", 0];
                break;
            case "Tue":
                vysledek = ["Út", 1];
                break;
            case "Wed":
                vysledek = ["St", 2];
                break;
            case "Thu":
                vysledek = ["Čt", 3];
                break;
            case "Fri":
                vysledek = ["Pá", 4];
                break;
            case "Sat":
                vysledek = ["So", 5];
                break;
            case "Sun":
                vysledek = ["Ne", 6];
                break;
            default:
                break;
        }

        return vysledek;
    }

    /**
     * Metoda vrati pocet dni v danem mesici
     * @param {int} month
     * @param {int} year 
     * @returns {int} pocet dni 
     */
    daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Metoda prepina mesice v kalendari dopredu
     */
    nextMonth() {
        this.numberMonth += 1;
        //console.log(this.numberMonth);
        this.print();
    }

    /**
     * Metoda prepina mesice v kalendari dozadu
     */
    prevMonth() {
        this.numberMonth -= 1;
        //console.log(this.numberMonth);
        this.print();
    }

    /**
     * Metoda vrati spravne ceske jmeno mesice a spravny rok 
     * Spravné jmeno i rok se vypocita podle dnesniho data 
     * @param {int} index index mesice 
     * @returns {string} nazev mesice a rok ve formatu: "mesic rok"
     */
    czechMonthNamesAndYear(index) {
        const date = new Date();
        var monthNamesPlus = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec",
            "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
        ];
        var monthNamesMinus = ["Prosinec", "Listopad", "Říjen", "Září", "Srpen", "Červenec", "Červen", "Květen", "Duben", "Březen", "Únor", "Leden"];

        if (index >= 0) {
            return monthNamesPlus[Math.abs(index) % 12] + " " + (date.getFullYear() + Math.trunc(index / 12));
        }

        if (index <= 0) {
            return monthNamesMinus[(Math.abs(index + 1) % 12)] + " " + (date.getFullYear() - (Math.trunc(((-1) * (index + 1)) / 12)) - 1);
        }
    }

    /**
     * Metoda zkrotroluje, jestli je aktualni den take event den
     * @param {date} date date
     * @returns {array} pole s inforamcemi o eventu. podle prvku eventu se automaticky pridaji prvky vracejiciho se pole
     */
    checkEventDay(date) {

        var eventData;

        for (let index = 0; index < this.events.length; index++) {
            if (this.events[index][0].getTime() == date.getTime()) {

                eventData = [true];

                for (let n = 0; n < this.events[index].length; n++) {
                    eventData.push(this.events[index][n]);
                }
                // eventData = [true, this.events[index][0], this.events[index][1], this.events[index][2], this.events[index][3], this.events[index][4]];
                //console.log(eventData);
                return eventData;
            } else {
                eventData = [false];
            }
        }

        return eventData;
    }

    /**
     * Prevede cislo na spravny format u mesice
     * Metoda prevadi i zaporne hodnoty na spravny format cisla mesice
     * napr. 2 => 02, 9=>09 atd...
     * @param {int} cislo 
     * @returns {string} spravny format cisla
     */
    prevodNaSpravneCisloMesic(cislo) {
        if (cislo > 0 && cislo < 10) {
            return "0" + cislo;
        } else if (cislo <= 0) {
            var zkouska = (cislo % 12) + 12;
            return this.prevodNaSpravneCisloMesic(zkouska);

        } else if (cislo > 12) {
            var zkouska = (cislo % 12) - 12;
            return this.prevodNaSpravneCisloMesic(zkouska);
        } else {
            return cislo;
        }
    }

    /**
     * Prevede cislo na spravny format u dne
     * napr. 2 => 02, 9=>09 atd...
     * @param {int} cislo 
     * @returns {string} spravny format cisla
     */
    prevodNaSpravneCisloDen(cislo) {
        if (cislo > 0 && cislo < 10) {
            return "0" + cislo;
        }
        return cislo;
    }

    /**
     * Metoda vypise kalendar do divu s id="calendar-content"
     */
    print() {
        var plus = this.numberMonth;
        const date = new Date();
        var aktualniMesic = date.getMonth() + plus;
        var prvniden = this.firstAndLastDaysInMonth(date.getFullYear(), aktualniMesic);
        var den = 1;
        var today = date.getDate();
        var nextDays = 1;
        var dniVMesici = this.daysInMonth(aktualniMesic, date.getFullYear());
        var dniVPredchozimMesici = this.daysInMonth(aktualniMesic - 1, date.getFullYear()) - (prvniden[1] - 1);
        var special = false;
        var AktualniDen;
        var AktualniRok = this.czechMonthNamesAndYear(aktualniMesic).split(" ");
        var DivEventContent;
        var data;
        var eventIdDay = [];
        var eventDivConent = [];
        var appendStr = "";

        // Vypise do nadpisu kalendra aktualni mesic a rok
        document.querySelector(".header-month p").innerHTML = this.czechMonthNamesAndYear(aktualniMesic);

        //Priprava promenne na vypis
        var calendar = ` <div class="divTableCalendar">
                            <div class="divTableBodyCalendar">
                                <div class="divTableRowCalendar header-days">
                                    <div class="divTableCellCalendar"><span>Po</span></div>
                                    <div class="divTableCellCalendar"><span>Út</span></div>
                                    <div class="divTableCellCalendar"><span>St</span></div>
                                    <div class="divTableCellCalendar"><span>Čt</span></div>
                                    <div class="divTableCellCalendar"><span>Pá</span></div>
                                    <div class="divTableCellCalendar"><span>So</span></div>
                                    <div class="divTableCellCalendar"><span>Ne</span></div>
                                </div>`;

        //pocet tydnu v mesici
        for (let i = 0; i < 6; i++) {
            calendar += `<div class="divTableRowCalendar">`;

            //dni v jednotlivem tydnu
            for (let j = 0; j < 7; j++) {

                //vypis predchozich dnu v predchozim mesici
                if (j < prvniden[1] && i == 0) {
                    calendar += `<div class="divTableCellCalendar prev"><span>` + dniVPredchozimMesici + `</span></div>`;
                    dniVPredchozimMesici++;
                    continue;
                }

                if (den <= dniVMesici) { //vypis dnu v aktualnim mesici

                    AktualniDen = new Date(AktualniRok[1] + "-" + this.prevodNaSpravneCisloMesic(aktualniMesic + 1) + "-" + this.prevodNaSpravneCisloDen(den));
                    var data = this.checkEventDay(AktualniDen);

                    if (den == today && plus == 0) { //zvyrazneni aktualniho dne
                        calendar += `<div class="divTableCellCalendar today"><span>` + den + `</span></div>`
                        den++;
                    } else if (data[0]) {// zvyrazneni dne s akci, priprava obsahu do divu akce
                        calendar += `<div class="divTableCellCalendar event eventDayId` + data[1].toLocaleDateString("en-US").replace('/', '').replace('/', '') + `"><span>` + den + `</span>`;
                        calendar += `<div class="eventContent"><p style="cursor: pointer;" onclick="window.location.href='` + data[4] + `'">` + data[3] + `</p>`;
                        DivEventContent = "";
                        for (let index = 5; index < data.length; index += 2) {

                            if (data[index + 1] === undefined) {
                                DivEventContent += `<p>` + data[index] + `</p>`;
                            } else {
                                DivEventContent += `<p style="cursor: pointer;" onclick="window.location.href='` + data[index + 1] + `'">` + data[index] + `</p>`;
                            }



                        }
                        eventIdDay.push(den);
                        DivEventContent += `</div></div>`;
                        eventDivConent.push(DivEventContent);
                        calendar += DivEventContent;
                        appendStr += ".eventDayId" + data[1].toLocaleDateString("en-US").replace('/', '').replace('/', '') + ":before{background-color:" + data[2] + " !important}";
                        special = true;
                        den++;
                    } else {//vypis normalniho dne
                        calendar += `<div class="divTableCellCalendar"><span>` + den + `</span></div>`
                        den++;
                    }

                } else {//vypis dnu, ktery je pristi mesic
                    calendar += `<div class="divTableCellCalendar next"><span>` + nextDays + `</span></div>`
                    nextDays++;
                }
            }

            //Priprava promenne na vypis
            calendar += `</div>`;

        }
        // vypis celeho pripraveneho kalendare v promenne "calendar" do divu s id "calendar-content"
        document.querySelector("#calendar-content").innerHTML = calendar;
        $("style").prepend(appendStr);
    }

}

