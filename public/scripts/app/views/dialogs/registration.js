// registration.js
App.Views.Dialogs.Registration = App.Views.Abstract.Dialog.extend({

	dialogName: 'registration',
	events: {
		"submit form": "onSubmit"
	},
	focusOnInit: '#input_login',
	initialize: function() {
		this.show();
	},
	onSubmit: function() {
		var that = this;

		this.$('.btn-primary').button('loading');

		var login = this.$('#input_login').val();
		var password = this.$('#input_password').val();
		var email = this.$('#input_email').val();

		App.currentUser.clear();

		this.listenTo(App.currentUser, 'signedInStatusChanged', function() {
			App.userChanged();
			this.hide();
		});

		this.listenTo(App.currentUser, 'registered', function() {
			this.$('.modal-body-default').slideUp();
			this.$('.modal-body-success').slideDown();
		});

		this.listenTo(App.currentUser, 'invalid', function() {
			var html = "";
			for (var k in App.currentUser.validationError) html += App.currentUser.validationError[k].msg + "<br>";
			this.$('.errors-container').html(html);
			this.$('.errors-container').slideDown();

			this.$('#input_login').focus(); /// @todo: focus to input with error
			this.$('.btn-primary').button('reset');
			var that = this;
			setTimeout(function() {
				that.$('.errors-container').slideUp();
			}, 2000);
		});

		App.currentUser.register(login, email, password);

		return false;
	}
});