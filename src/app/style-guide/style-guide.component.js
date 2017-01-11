import { Component } from '@angular/core';

@Component({
    selector: `style-guide-component`,
    templateUrl: `app/style-guide/style-guide.template.html`,
    styleUrls: [`app/style-guide/style-guide.style.css`]
})

export class StyleGuideComponent {

    constructor() {

        // typography
        this.fonts = [
            {
                title: `'corporate-a', serif;`
            },
            {
                title: `'corporate-s', sans-serif;`
            }
        ];

        this.headers = {
            h1: `Header 1`,
            h2: `Header 2`,
            h3: `Header 3`
        };

        this.paragraphs = {
            preamble: `Preamble text example. Nullam quis risus eget vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.`,
            normal: `Normal body text example.`,
            bold: `Bold body text example.`,
            loading: `Loading text example`
        };

        // icons
        this.icons = [
            { symbol: `icon-origin-vatten` },
            { symbol: `icon-origin-vind` },
            { symbol: `icon-origin-solel` },
            { symbol: `icon-usage.type.apartment` },
            { symbol: `icon-usage.type.small-house` },
            { symbol: `icon-usage.type.large-house` },
            { symbol: `icon-call-us` },
            { symbol: `icon-call-us-circle` },
            { symbol: `icon-back-arrow` }
        ];

        // colors
        this.colors = [
            {
                title: `Primary color`,
                class: `primary`
            },
            {
                title: `Secondary color`,
                class: `secondary`
            },
            {
                title: `Dark green color`,
                class: `dark-green`
            },
            {
                title: `Light green color`,
                class: `light-green`
            },
            {
                title: `Lighter green color`,
                class: `lighter-green`
            },
            {
                title: `Focus green color`,
                class: `focus-green`
            },
            {
                title: `Disabled green color`,
                class: `disabled-green`
            },
            {
                title: `Dark grey color`,
                class: `dark-grey`
            },
            {
                title: `Light grey color`,
                class: `light-grey`
            },
            {
                title: `Lighter color`,
                class: `lighter-grey`
            },
            {
                title: `Blue color`,
                class: `blue`
            },
            {
                title: `Light blue color`,
                class: `light-blue`
            },
            {
                title: `Lighter blue color`,
                class: `lighter-blue`
            },
            {
                title: `Orange color`,
                class: `orange`
            },
            {
                title: `Black color`,
                class: `black`
            }
        ];

        // action-buttons
        this.actionButtonPrimary = `PRIMARY`;
        this.actionButtonDisabled = `DISABLED`;
        this.actionButtonSecondary = `SECONDARY`;

        // text-button
        this.textButton = {
            title: `TEXTBUTTON`,
            icon: `icon-back-arrow`
        };

        // cards
        this.cards = [
            {
                highlight: true,
                prefered: `LABEL`,
                icon: `icon-origin-solel`,
                title: `Title`,
                subtitle: `Subtitle`,
                button: `PRIMARY`
            },
            {
                highlight: false,
                icon: `icon-origin-vatten`,
                title: `Title`,
                subtitle: `Subtitle`,
                button: `SECONDARY`
            },
            {
                highlight: false,
                icon: `icon-usage.type.small-house`,
                title: `Title`,
                subtitle: `Subtitle`,
                button: `SECONDARY`
            }
        ];

        // badge
        this.badge = {
            icon: `icon-call-us`,
            title: `Title`,
            subtitle: `Subtitle`
        };
    }
}