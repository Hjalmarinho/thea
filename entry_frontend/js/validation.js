$( document ).ready(function() {

	// Form validation
	$('.ui.form')
	.form({
		fields: {
			fornavn: {
				identifier  : 'fornavn',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn fornavn'
				}
				]
			},
			etternavn: {
				identifier  : 'etternavn',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn etternavn'
				}
				]
			},
			fodselsdato: {
				identifier  : 'fodselsdato',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn fødselsdato'
				}
				]
			},
			kjonn: {
				identifier  : 'kjonn',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg kjønn'
				}
				]
			},
			student: {
				identifier  : 'student',
				rules: [
				{
					type   : 'empty',
					prompt : 'Angi om du er student eller ikke'
				}
				]
			},
			epost: {
				identifier  : 'epost',
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
			mobil: {
				identifier  : 'mobil',
				rules: [
				{
					type   : 'empty',
					prompt : 'Skriv inn mobilnummer'
				}
				]
			},
			klubb: {
				identifier  : 'klubb',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg klubb'
				}
				]
			},
			idrett: {
				identifier  : 'idrett',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg idrett'
				}
				]
			},
			lag: {
				identifier  : 'lag',
				rules: [
				{
					type   : 'empty',
					prompt : 'Velg lag'
				}
				]
			},
			avtalevilkar: {
				identifier  : 'avtalevilkar',
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