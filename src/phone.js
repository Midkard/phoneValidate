'use strict';
(function ( $ ) {
    $.fn.phoneMask = function () {
        // Если коллекция пуста, то заканчиваем сразу
        if ( !this.length ) {
            return;
        }

        //Здесь проходим по каждому элементу коллекции
        this.each( function () {
            // Проверяем не создавали ли валидатор для этого элемента. Если да, то выходим.
            var phoneMask = $( this ).data( "phoneMask" );
            if ( phoneMask ) {
                return;
            }

            phoneMask = new PhoneField( this );
            $( this ).data( "phoneMask", phoneMask );
        } );

        return this;
    };

    function PhoneField( elem ) {
        this.elem = $(elem);
        
        //Привязываем обработчики к собятиям элемента
        $( elem ).on( 'input', this._transformToPhone.bind(this) );

    }

// Добавляем статические функции для Field
    PhoneField.prototype._transformToPhone = function () {

        var value = this.elem.val();
        if ( !value ) {
            return;
        }

        value = value.replace( /\D/g, '' );
        if ( !value.length ) {
            this.elem.val( '' );
            return;
        }
        if ( '7' === value[0] || '8' === value[0] ) {
            value = value.slice( 1 );
        }

        var newValue = '+7(';
        var groups = [value.slice( 0, 3 ), value.slice( 3, 6 ), value.slice( 6, 8 ), value.slice( 8, 10 )];

        groups = groups.filter( function ( el ) {
            return el !== '';
        } );

        groups.forEach( function ( el, index ) {
            if ( index === 1 ) {
                newValue += ') ';
            }
            if ( index > 1 ) {
                newValue += '-';
            }
            newValue += el;
        } );

        this.elem.val( newValue );

    };

})( jQuery );