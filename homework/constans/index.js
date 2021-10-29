module.exports = {
    regexes: require('./regexes'),
    userRole: require('./users-role'),
    responseMessages: require('../errors/status-enum'),
    typeTokenEnum: require('./token-type-enum'),
    headerEnum: require('./header-enum'),
    emailTemplatesEnum: require('./email-templates-enum'),
    actionTokenEnum:require('./action-token-type'),
    modelNameEnum:require('./model-name-enum'),
    avsS3:require('./aws-s3')
};
