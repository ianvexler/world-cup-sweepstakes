class AdminUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :is_admin, :name, :created_at
end
