// **********************************************************************
//  [GUI Validation]
//
//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Validate user input
// ***********************************************************************

$( document ).ready(function() {

	// Form validation
	$('.ui.form')
	.form({
		fields: {
			first_name: {
				identifier  : 'first_name',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn fornavn'
				}
				]
			},
			last_name: {
				identifier  : 'last_name',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn etternavn'
				}
				]
			},
			birthdate: {
				identifier  : 'birthdate',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn fødselsdato'
				}
				]
			},
			gender: {
				identifier  : 'gender',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg kjønn'
				}
				]
			},
			is_student: {
				identifier  : 'is_student',
				rules: [
				{
					type   : 'empty',
					prompt : 'Angi om du er student eller ikke'
				}
				]
			},
			email: {
				identifier  : 'email',
				rules: [
				{
					type   : 'email',
					prompt : 'Skriv inn epost'
				},
				{
					type   : 'email',
					prompt : 'Eposten er ugyldig'
				}
				]
			},
			phone: {
				identifier  : 'phone',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn mobilnummer'
				}
				]
			},
			clubs: {
				identifier  : 'clubs',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg klubb'
				}
				]
			},
			is_clubmember: {
				identifier  : 'is_clubmember',
				rules: [
				{
					type   : 'empty',
					prompt : 'Angi om du er medlem av klubben din'
				}
				]
			},
			sports: {
				identifier  : 'sports',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg idrett'
				}
				]
			},
			team_name: {
				identifier  : 'team_name',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv lagnavn'
				}
				]
			},
			team_gender: {
				identifier  : 'team_gender',
				rules: [
				{
					type   : 'empty',
					prompt : 'Angi hvilken klasse laget skal delta i'
				}
				]
			},
			is_playing: {
				identifier  : 'is_playing',
				rules: [
				{
					type   : 'empty',
					prompt : 'Angi om du skal spille på laget eller ikke'
				}
				]
			},
			terms: {
				identifier  : 'terms',
				rules: [
				{
					type   : 'checked',
					prompt : 'Du må godta avtalevilkårene for å melde deg på'
				}
				]
			},
			policy: {
				identifier  : 'policy',
				rules: [
				{
					type   : 'checked',
					prompt : 'Du må samtykke i behandling av personlig data'
				}
				]
			},
			role: {
				identifier  : 'role',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn din tittel/funksjon'
				}
				]
			},
			organization: {
				identifier  : 'organization',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn hvilken organisasjon du er i fra'
				}
				]
			},
		}
	})
});