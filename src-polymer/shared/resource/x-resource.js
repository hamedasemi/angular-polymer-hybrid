Polymer.Behaviors = Polymer.Behaviors || {};
Polymer.Behaviors.Resource = [Polymer.AppLocalizeBehavior, {

    properties: {
        language: {
            value: `sv`
        },
        formats: {
            type: Object,
            value: function () {
                return {
                    number: {
                        ÖRE: {
                            style: `decimal`,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        },
                        SEK: {
                            style: `decimal`,
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }
                    }
                };
            }
        },
        resources: {
            value: function () {
                return {
                    sv: {
                        "formats.number": `{value, number}`,
                        "formats.number.kwhPerYearUnit": `{value, number} kWh/år`,
                        "formats.currency.swedish": `{price, number, SEK} kr`,
                        "formats.currency.swedishDecimal": `{price, number, ÖRE} {unit}`,
                        //-----------------------
                        // UNITS
                        //-----------------------
                        "unit.currency.swedishOrePerKwh": `öre/kWh`,
                        //-----------------------
                        // about
                        //-----------------------
                        "about-component.action": `Välj`,
                        "about-component.footer.text": `Fortum Markets samlade elförsäljning i Sverige hade under 2015 följande ursprung: 22 % kärnkraft och 78 % förnybara energikällor (sol-, vind- och vattenkraft).`,
                        "about-component.preferred.title": `Rekommenderas`,
                        "about-component.card.title": `{type, select, vind {Vindkraft} solel {Solkraft} vatten {Vattenkraft} other {?????}}`,
                        //-----------------------
                        // OTHERS
                        //-----------------------
                        "JUST_A_LOCALE": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate provident nesciunt iusto eum cumque cum doloribus omnis repudiandae vitae quisquam excepturi blanditiis, fugit rerum fugiat, voluptas sequi saepe accusamus animi!`,
                        //-----------------------
                        // CONTACT-SUPPORT
                        //-----------------------
                        "contact-support-component.short-text": `Öppet dygnet runt`,
                        "contact-support-component.telephone-number": `020 - 46 00 00`,

                        //-----------------------
                        // GENERAL
                        //-----------------------
                        "general.button.cancel": `Avbryt`,
                        "general.button.save": `Spara`,
                        "general.button.go-back": `Tillbaka`,
                        "general.button.close": `Stäng`,
                        "general.button.continue": `Fortsätt`,


                        //-----------------------
                        // ERRORS
                        //-----------------------
                        "error.servicelayer.postalcode.not.exist": `Vi kunde inte hitta ditt postnummer.`,
                        "error.servicelayer.customer.personnummer.invalid": `Vänligen ange ett giltigt personnummer.`,
                        "error.servicelayer.customer.personnummer.too.young": `Du måste vara 18 år eller äldre.`,
                        "error.servicelayer.address.preconditions.invalid": `Fyll i ditt postummer för att hämta din address automatiskt.`,
                        "error.servicelayer.address.not.found": ``, // keep empty to not cause error, will show a customer info instead of text

                        "error.valid-postalcode-five-digits": `Var god och mata in ett giltigt postnummer bestående av 5 siffror.`,
                        "error.personal-number-wrong-format": `Ange personnumret i formatet ÅÅMMDDXXXX.`,
                        "error.personal-number-invalid": `Vänligen ange ett giltigt personnummer.`,
                        "error.required-info": `Obligatorisk uppgift.`,
                        "error.invalid-apartment-number": `Var god och mata in ett giltigt lägenhetesnummer bestående av 4 siffror.`,
                        "error.add-valid-email": `Lägg till en giltig e-postadress.`,
                        "error.add-valid-telephone-number": `Lägg till ett giltligt telefonnummer.`,
                        "error.grid-code-requires-three-letters": `Ditt områdes-ID måste ha tre bokstäver.`,
                        "error.meter-point-wrong-format": `Ditt anläggnings-ID måste ha 18 siffror och börja med "735999".`,
                        "error.meter-point-invalid": `Vänligen ange ett giltigt anläggnings-ID.`,

                        // Not done. Dependant of other changes.
                        "business.error.complementary.header": `Oj, något gick fel!`,
                        "business.error.complementary.number": `020 - 46 00 00`,
                        "business.error.complementary.p": `Som tur är finns vi tillgängliga dygnet runt, vi besvarar gärna ditt ärende på numret nedan.`
                    }
                };
            }
        }
    }
}];