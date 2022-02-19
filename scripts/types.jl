using JSON3
using PowerSystems
using InteractiveUtils
using Base64

function children!(data, t)
    data["name"] = string(t)
    data["documentation"] = string(Base.Docs.doc(t))
    if length(subtypes(t)) == 0
        data["fields"] = string.(fieldnames(t))
    else
        data["children"] = []
        for subtype in subtypes(t)
            c = Dict()
            push!(data["children"], c)
            children!(c, subtype)
        end
    end
end

function main()
    data = Dict()
    children!(data, PowerSystems.Component)
    JSON3.write(data)
end

print(main());
