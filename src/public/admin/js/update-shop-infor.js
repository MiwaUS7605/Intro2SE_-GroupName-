
$(function()
{
    // $('#shop-img-error').hide();
    let validShopImg = true;
    let validShopMomo = true;
    let validShopName = true;
    let validShopDes = true;
    let validShopBank = true;

    $('#edit-shop-img').change(function(){
        let file = this.files[0];
        if(file)
        {
            let fileExtension = this.files[0]['type'];
            console.log(fileExtension);
            if((fileExtension !== 'image/png' ) && (fileExtension !== 'image/svg') && (fileExtension !== 'image/jpg') && (fileExtension !== 'image/jpeg'))
            {
                $('#shop-img-error').show();
                $('#update-shop-infor-submit').attr('disabled', 'disabled');
                validShopImg = false;
            }
            else
            {
                $('#shop-img-error').hide();
                validShopImg = true;
                if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
                {
                    $('#update-shop-infor-submit').removeAttr('disabled');
                }
            }
        }
        else
        {
            $('#shop-img-error').hide();
            validShopImg = true;
            if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
            {
                $('#update-shop-infor-submit').removeAttr('disabled');
            }
        }
    })

    $('#edit-momo-qr').change(function(){
        let file = this.files[0];
        if(file)
        {
            let fileExtension = this.files[0]['type'];
            if((fileExtension !== 'image/png' ) && (fileExtension !== 'image/svg') && (fileExtension !== 'image/jpg') && (fileExtension !== 'image/jpeg'))
            {
                $('#momo-img-error').show();
                $('#update-shop-infor-submit').attr('disabled', 'disabled');
                validShopMomo = false
            }
            else
            {
                $('#momo-img-error').hide();
                validShopMomo = true;
                if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
                {
                    $('#update-shop-infor-submit').removeAttr('disabled');
                }
            }
        }
        else
        {
            $('#momo-img-error').hide();
            validShopMomo = true;
            if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
            {
                $('#update-shop-infor-submit').removeAttr('disabled');
            }
        }
    })
    
    $('#edit-shop-name').blur(function()
    {
        let value = $('#edit-shop-name').val();
        if(!validator.isAlphanumeric(value, 'en-US', {ignore: '\s'}))
        {
            $('#shop-name-error').show();
            $('#update-shop-infor-submit').attr('disabled', 'disabled');
            validShopName = false;
        }
        else
        {
            $('#shop-name-error').hide();
            validShopName = true;
            if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
            {
                $('#update-shop-infor-submit').removeAttr('disabled');
            }
        }
    })

    $('#edit-shop-description').blur(function()
    {
        let value = $('#edit-shop-description').val();
        if(!validator.isAlphanumeric(value, 'en-US', {ignore: "\s!.()-%,?"}))
        {
            $('#shop-description-error').show();
            $('#update-shop-infor-submit').attr('disabled', 'disabled');
            validShopDes = false;
        }
        else
        {
            $('#shop-description-error').hide();
            validShopDes = true;
            if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
            {
                $('#update-shop-infor-submit').removeAttr('disabled');
            }
        }
    })

    $('#edit-shop-bank').blur(function()
    {
        let value = $('#edit-shop-bank').val();
        if(!value || value == "")
        {
            $('#shop-bank-error').hide();
            if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
            {
                $('#update-shop-infor-submit').removeAttr('disabled');
            }
            return;
        }
        for(let i = 0; i< value.length; i++)
        {
            if(isNaN(value[i]) && (value[i] != '\s'))
            {
                $('#shop-bank-error').show();
                $('#update-shop-infor-submit').attr('disabled', 'disabled');
                validShopBank = false;
                return;
            }
        }
        validShopBank = true;
        $('#shop-bank-error').hide();
        if(validShopImg && validShopMomo && validShopName && validShopDes && validShopBank)
        {
            $('#update-shop-infor-submit').removeAttr('disabled');
        }
    })
    

})