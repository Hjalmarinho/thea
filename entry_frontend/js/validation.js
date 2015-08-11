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
			member: {
				identifier  : 'member',
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
			teams: {
				identifier  : 'teams',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg lag'
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
			}
		}
	})
	;
 
});